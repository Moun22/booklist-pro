import { useQuery, useQueryClient } from '@tanstack/react-query';

import { trouverDansListes } from './cacheOuvrages';
import { clesOuvrages } from './cles';
import type { Ouvrage } from '@/domain/ouvrage';
import { obtenirOuvrage } from '@/services/api/ouvrages';

export type FicheChargee = {
  ouvrage: Ouvrage | undefined;
  provisoire: boolean;
  chargement: boolean;
  erreur: unknown;
  reessayer: () => void;
};

export function useOuvrage(id: string): FicheChargee {
  const client = useQueryClient();
  const requete = useQuery<Ouvrage>({
    queryKey: clesOuvrages.detail(id),
    queryFn: ({ signal }) => obtenirOuvrage(id, signal),
    placeholderData: () => trouverDansListes(client, id),
  });

  return {
    ouvrage: requete.data,
    provisoire: requete.isPlaceholderData,
    chargement: requete.isPending,
    erreur: requete.isError ? requete.error : null,
    reessayer: () => {
      void requete.refetch();
    },
  };
}
