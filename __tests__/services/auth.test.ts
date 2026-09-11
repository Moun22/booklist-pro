import { afterEach, describe, expect, it, jest } from '@jest/globals';

import { reponseJson } from '../helpers/fixtures';
import { ErreurAuth } from '@/domain/erreurs';
import { lireExigenceAuth, rafraichirJeton, seConnecter } from '@/services/api/auth';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('services/api/auth', () => {
  it('posts the credentials and returns the tokens with the account', async () => {
    const transport = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      reponseJson({
        accessToken: 'acces',
        refreshToken: 'rafraichissement',
        expiresIn: '120s',
        utilisateur: { id: 'u1', email: 'editeur@booklist.fr', role: 'editeur' },
      }),
    );

    const connexion = await seConnecter('editeur@booklist.fr', 'editeur123');

    expect(connexion).toEqual({
      jetons: { accessToken: 'acces', refreshToken: 'rafraichissement' },
      utilisateur: { id: 'u1', email: 'editeur@booklist.fr', role: 'editeur' },
    });
    expect(transport).toHaveBeenCalledWith(
      'http://localhost:3000/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ email: 'editeur@booklist.fr', motDePasse: 'editeur123' }),
      }),
    );
  });

  it('turns a refused login into a typed error the form can name', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson({ erreur: 'identifiants_invalides' }, 401));

    const erreur = await seConnecter('x@y.z', 'faux').catch((e: unknown) => e);

    expect(erreur).toBeInstanceOf(ErreurAuth);
    expect((erreur as ErreurAuth).code).toBe('identifiants_invalides');
  });

  it('reads from /health whether the server requires a token', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson({ statut: 'ok', version: '2.1.0', authRequise: true }));

    await expect(lireExigenceAuth()).resolves.toBe(true);
  });

  it('exchanges the refresh token for a new access token', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson({ accessToken: 'nouveau', expiresIn: '120s' }));

    await expect(rafraichirJeton('rafraichissement')).resolves.toBe('nouveau');
    expect(transport).toHaveBeenCalledWith(
      'http://localhost:3000/auth/refresh',
      expect.objectContaining({ body: JSON.stringify({ refreshToken: 'rafraichissement' }) }),
    );
  });
});
