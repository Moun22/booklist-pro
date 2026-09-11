import { useQuery } from '@tanstack/react-query';

import { lireExigenceAuth } from '@/services/api/auth';

export type EtatServeur = 'inconnu' | 'joignable' | 'injoignable';

const INTERVALLE_MS = 30_000;

// The mark in the band says what was measured, not what is hoped: /health every thirty seconds.
export function useEtatServeur(): EtatServeur {
  const sonde = useQuery({
    queryKey: ['serveur', 'sante'],
    queryFn: ({ signal }) => lireExigenceAuth(signal),
    refetchInterval: INTERVALLE_MS,
    refetchIntervalInBackground: false,
    staleTime: INTERVALLE_MS,
    retry: false,
  });
  if (sonde.isSuccess) {
    return 'joignable';
  }
  return sonde.isError ? 'injoignable' : 'inconnu';
}
