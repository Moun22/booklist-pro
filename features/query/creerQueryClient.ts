import { QueryClient } from '@tanstack/react-query';

import { estErreurApplicative } from '@/domain/erreurs';

const TENTATIVES_MAX = 2;
const FRAICHEUR_MS = 30_000;

export function doitReessayer(tentative: number, erreur: unknown): boolean {
  return (
    tentative < TENTATIVES_MAX &&
    estErreurApplicative(erreur) &&
    erreur.type === 'reseau' &&
    erreur.reessayable
  );
}

export function creerQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: FRAICHEUR_MS,
        retry: doitReessayer,
      },
      mutations: {
        retry: false,
      },
    },
  });
}
