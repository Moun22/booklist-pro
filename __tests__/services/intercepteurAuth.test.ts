import { describe, expect, it, jest } from '@jest/globals';
import { z } from 'zod';

import { reponseJson } from '../helpers/fixtures';
import { ErreurAuth } from '@/domain/erreurs';
import type { Jetons } from '@/domain/session';
import { creerClientHttp } from '@/services/api/client';
import { creerIntercepteurAuth } from '@/services/api/intercepteurAuth';

const schema = z.object({ ok: z.boolean() });
const JETON_FRAIS = 'frais';

// A server that accepts one token, refuses a stale one as expired, and forbids one route.
function transportDeServeur() {
  return jest.fn<typeof fetch>((entree, init) => {
    const entetes = init?.headers as Record<string, string> | undefined;
    const autorisation = entetes?.Authorization;
    if (String(entree).endsWith('/interdit')) {
      return Promise.resolve(reponseJson({ erreur: 'droits_insuffisants' }, 403));
    }
    if (autorisation === undefined) {
      return Promise.resolve(reponseJson({ erreur: 'jeton_absent' }, 401));
    }
    if (autorisation !== `Bearer ${JETON_FRAIS}`) {
      return Promise.resolve(reponseJson({ erreur: 'jeton_expire' }, 401));
    }
    return Promise.resolve(reponseJson({ ok: true }));
  });
}

function monter(jetons: Jetons | null, rafraichir = async () => JETON_FRAIS) {
  let courants = jetons;
  const transport = transportDeServeur();
  const client = creerClientHttp({ baseUrl: 'http://api.test', delaiMs: 1000, transport });
  const surSessionPerdue = jest.fn();
  const rafraichissement = jest.fn(rafraichir);
  client.definirIntercepteur(
    creerIntercepteurAuth({
      lireJetons: () => courants,
      rafraichir: rafraichissement,
      surJetonRenouvele: (accessToken) => {
        courants = courants === null ? null : { ...courants, accessToken };
      },
      surSessionPerdue,
    }),
  );
  return { client, transport, rafraichissement, surSessionPerdue };
}

describe('creerIntercepteurAuth', () => {
  it('adds the bearer token to every request', async () => {
    const { client, transport, rafraichissement } = monter({
      accessToken: JETON_FRAIS,
      refreshToken: 'r',
    });

    await expect(client.requeter({ chemin: '/books' }, schema)).resolves.toEqual({ ok: true });

    expect(transport).toHaveBeenCalledWith(
      'http://api.test/books',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: `Bearer ${JETON_FRAIS}` }),
      }),
    );
    expect(rafraichissement).not.toHaveBeenCalled();
  });

  it('refreshes once for ten simultaneous expired requests, then replays them all', async () => {
    const { client, transport, rafraichissement, surSessionPerdue } = monter(
      { accessToken: 'perime', refreshToken: 'r' },
      () => new Promise((resolve) => setTimeout(() => resolve(JETON_FRAIS), 10)),
    );

    const resultats = await Promise.all(
      Array.from({ length: 10 }, (_, i) => client.requeter({ chemin: `/books/${i}` }, schema)),
    );

    expect(resultats).toHaveLength(10);
    expect(resultats.every((r) => r.ok)).toBe(true);
    expect(rafraichissement).toHaveBeenCalledTimes(1);
    expect(rafraichissement).toHaveBeenCalledWith('r');
    expect(transport).toHaveBeenCalledTimes(20);
    expect(surSessionPerdue).not.toHaveBeenCalled();
  });

  it('gives up the session when there is no token to refresh', async () => {
    const { client, rafraichissement, surSessionPerdue } = monter(null);

    const erreur = await client.requeter({ chemin: '/books' }, schema).catch((e: unknown) => e);

    expect(erreur).toBeInstanceOf(ErreurAuth);
    expect((erreur as ErreurAuth).code).toBe('jeton_absent');
    expect(surSessionPerdue).toHaveBeenCalledTimes(1);
    expect(rafraichissement).not.toHaveBeenCalled();
  });

  it('gives up the session when the refresh itself is refused', async () => {
    const refus = new ErreurAuth('refresh_invalide', 'Jeton de rafraichissement invalide.', 401);
    const { client, surSessionPerdue } = monter({ accessToken: 'perime', refreshToken: 'r' }, () =>
      Promise.reject(refus),
    );

    const erreur = await client.requeter({ chemin: '/books' }, schema).catch((e: unknown) => e);

    expect(erreur).toBe(refus);
    expect(surSessionPerdue).toHaveBeenCalledTimes(1);
  });

  it('lets a 403 through: a read-only account is not an expired session', async () => {
    const { client, rafraichissement, surSessionPerdue } = monter({
      accessToken: JETON_FRAIS,
      refreshToken: 'r',
    });

    const erreur = await client
      .requeter({ methode: 'POST', chemin: '/interdit', corps: {} }, schema)
      .catch((e: unknown) => e);

    expect(erreur).toBeInstanceOf(ErreurAuth);
    expect((erreur as ErreurAuth).statut).toBe(403);
    expect(rafraichissement).not.toHaveBeenCalled();
    expect(surSessionPerdue).not.toHaveBeenCalled();
  });
});
