import type { Intercepteur } from './client';
import type { ErreurAuth } from '@/domain/erreurs';
import type { Jetons } from '@/domain/session';

type Options = {
  lireJetons: () => Jetons | null;
  rafraichir: (refreshToken: string) => Promise<string>;
  surJetonRenouvele: (accessToken: string) => void;
  surSessionPerdue: (erreur: ErreurAuth) => void;
};

// One refresh at a time: the first expired request starts it, every other one waits for the same
// promise, then all of them replay with the new token. Ten 401s at once make one refresh.
export function creerIntercepteurAuth(options: Options): Intercepteur {
  let rafraichissement: Promise<string> | null = null;

  const renouveler = (jetons: Jetons): Promise<string> => {
    if (rafraichissement === null) {
      rafraichissement = options
        .rafraichir(jetons.refreshToken)
        .then((accessToken) => {
          options.surJetonRenouvele(accessToken);
          return accessToken;
        })
        .finally(() => {
          rafraichissement = null;
        });
    }
    return rafraichissement;
  };

  return {
    preparer: (requete) => {
      const jetons = options.lireJetons();
      if (jetons === null) {
        return requete;
      }
      return {
        ...requete,
        entetes: { ...requete.entetes, Authorization: `Bearer ${jetons.accessToken}` },
      };
    },

    reprendre: async (erreur, rejouer) => {
      const jetons = options.lireJetons();
      if (erreur.code !== 'jeton_expire' || jetons === null) {
        if (erreur.statut === 401) {
          options.surSessionPerdue(erreur);
        }
        throw erreur;
      }
      try {
        await renouveler(jetons);
      } catch (echec) {
        options.surSessionPerdue(erreur);
        throw echec;
      }
      return rejouer();
    },
  };
}
