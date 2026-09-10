import { describe, expect, it, jest } from '@jest/globals';
import { z } from 'zod';

import { ouvrageExemple, reponseJson, reponseVide } from '../helpers/fixtures';
import {
  ErreurAuth,
  ErreurConflit,
  ErreurIntrouvable,
  ErreurReseau,
  ErreurValidation,
} from '@/domain/erreurs';
import { creerClientHttp } from '@/services/api/client';

const schemaMessage = z.object({ message: z.string() });

function clientAvec(reponses: Response[], delaiMs = 1000) {
  const transport = jest.fn<typeof fetch>();
  for (const reponse of reponses) {
    transport.mockResolvedValueOnce(reponse);
  }
  return { client: creerClientHttp({ baseUrl: 'http://api.test', delaiMs, transport }), transport };
}

function erreurAnnulation(): Error {
  const erreur = new Error('Annulée');
  erreur.name = 'AbortError';
  return erreur;
}

describe('creerClientHttp', () => {
  it('prefixes the base URL, sends JSON and validates the answer', async () => {
    const { client, transport } = clientAvec([reponseJson({ message: 'ok' }, 201)]);

    const resultat = await client.requeter(
      { methode: 'POST', chemin: '/books', corps: { titre: 'Dune' } },
      schemaMessage,
    );

    expect(resultat).toEqual({ message: 'ok' });
    expect(transport).toHaveBeenCalledWith(
      'http://api.test/books',
      expect.objectContaining({
        method: 'POST',
        body: '{"titre":"Dune"}',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      }),
    );
  });

  it('rejects an answer that does not match the schema', async () => {
    const { client } = clientAvec([reponseJson({ autre: 1 })]);

    const erreur = await client.requeter({ chemin: '/books' }, schemaMessage).catch((e: unknown) => e);

    expect(erreur).toBeInstanceOf(ErreurReseau);
    expect((erreur as ErreurReseau).cause).toBe('reponse-invalide');
    expect((erreur as ErreurReseau).reessayable).toBe(false);
  });

  it('returns undefined for an empty 204 answer', async () => {
    const { client } = clientAvec([reponseVide()]);

    await expect(client.requeter({ methode: 'DELETE', chemin: '/books/1' })).resolves.toBeUndefined();
  });

  it('maps 422 to a validation error carrying each field', async () => {
    const { client } = clientAvec([
      reponseJson({ erreur: 'validation', champs: { titre: 'champ obligatoire' } }, 422),
    ]);

    const erreur = await client.requeter({ chemin: '/books' }, schemaMessage).catch((e: unknown) => e);

    expect(erreur).toBeInstanceOf(ErreurValidation);
    expect((erreur as ErreurValidation).champs).toEqual({ titre: 'champ obligatoire' });
  });

  it('maps 409 to a conflict carrying the server version of the ouvrage', async () => {
    const { client } = clientAvec([
      reponseJson({ erreur: 'conflit', message: 'Modifié', serveur: ouvrageExemple, versionAttendue: 3 }, 409),
    ]);

    const erreur = await client.requeter({ chemin: '/books/1' }, schemaMessage).catch((e: unknown) => e);

    expect(erreur).toBeInstanceOf(ErreurConflit);
    expect((erreur as ErreurConflit).serveur.id).toBe(ouvrageExemple.id);
    expect((erreur as ErreurConflit).versionAttendue).toBe(3);
  });

  it('maps 404 and 503 to their own errors, 503 being retryable', async () => {
    const { client } = clientAvec([
      reponseJson({ erreur: 'introuvable' }, 404),
      reponseJson({ erreur: 'service_indisponible' }, 503),
    ]);

    const introuvable = await client.requeter({ chemin: '/x' }, schemaMessage).catch((e: unknown) => e);
    const indisponible = await client.requeter({ chemin: '/x' }, schemaMessage).catch((e: unknown) => e);

    expect(introuvable).toBeInstanceOf(ErreurIntrouvable);
    expect(indisponible).toBeInstanceOf(ErreurReseau);
    expect((indisponible as ErreurReseau).cause).toBe('indisponible');
    expect((indisponible as ErreurReseau).reessayable).toBe(true);
  });

  it('turns a transport failure into an offline error', async () => {
    const transport = jest.fn<typeof fetch>().mockRejectedValue(new TypeError('Failed to fetch'));
    const client = creerClientHttp({ baseUrl: 'http://api.test', delaiMs: 1000, transport });

    const erreur = await client.requeter({ chemin: '/books' }, schemaMessage).catch((e: unknown) => e);

    expect(erreur).toBeInstanceOf(ErreurReseau);
    expect((erreur as ErreurReseau).cause).toBe('hors-ligne');
  });

  it('aborts after the configured delay', async () => {
    const transport = jest.fn<typeof fetch>(
      (_entree, init) =>
        new Promise((_resoudre, rejeter) => {
          init?.signal?.addEventListener('abort', () => rejeter(erreurAnnulation()));
        }),
    );
    const client = creerClientHttp({ baseUrl: 'http://api.test', delaiMs: 20, transport });

    const erreur = await client.requeter({ chemin: '/books' }, schemaMessage).catch((e: unknown) => e);

    expect(erreur).toBeInstanceOf(ErreurReseau);
    expect((erreur as ErreurReseau).cause).toBe('delai');
  });

  it('lets a cancellation requested by the caller surface untouched', async () => {
    const transport = jest.fn<typeof fetch>(
      (_entree, init) =>
        new Promise((_resoudre, rejeter) => {
          init?.signal?.addEventListener('abort', () => rejeter(erreurAnnulation()));
        }),
    );
    const client = creerClientHttp({ baseUrl: 'http://api.test', delaiMs: 1000, transport });
    const controleur = new AbortController();

    const attente = client
      .requeter({ chemin: '/books', signal: controleur.signal }, schemaMessage)
      .catch((e: unknown) => e);
    controleur.abort();
    const erreur = await attente;

    expect(erreur).not.toBeInstanceOf(ErreurReseau);
    expect((erreur as Error).name).toBe('AbortError');
  });

  it('runs the interceptor before each request and replays once after a 401', async () => {
    const { client, transport } = clientAvec([
      reponseJson({ erreur: 'jeton_expire' }, 401),
      reponseJson({ message: 'après rejeu' }),
    ]);
    let jeton = 'périmé';
    const reprendre = jest.fn(async (erreur: ErreurAuth, rejouer: () => Promise<Response>) => {
      expect(erreur.code).toBe('jeton_expire');
      jeton = 'frais';
      return rejouer();
    });
    client.definirIntercepteur({
      preparer: (requete) => ({
        ...requete,
        entetes: { ...requete.entetes, Authorization: `Bearer ${jeton}` },
      }),
      reprendre,
    });

    const resultat = await client.requeter({ chemin: '/me' }, schemaMessage);

    expect(resultat).toEqual({ message: 'après rejeu' });
    expect(reprendre).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenNthCalledWith(
      1,
      'http://api.test/me',
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer périmé' }) }),
    );
    expect(transport).toHaveBeenNthCalledWith(
      2,
      'http://api.test/me',
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer frais' }) }),
    );
  });
});
