import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';

import { propagerOuvrage, trouverDansListes, type DonneesListe } from './cacheOuvrages';
import { clesOuvrages } from './cles';
import type { Ouvrage, OuvrageRetouche } from '@/domain/ouvrage';
import { retoucherOuvrage } from '@/services/api/ouvrages';

type Variables = {
  retouche: OuvrageRetouche;
  version: number;
};

type Instantane = {
  precedent: Ouvrage | undefined;
  listes: [QueryKey, DonneesListe | undefined][];
};

export function useRetoucheOuvrage(id: string) {
  const client = useQueryClient();
  const cleDetail = clesOuvrages.detail(id);

  return useMutation<Ouvrage, unknown, Variables, Instantane>({
    mutationFn: ({ retouche, version }) => retoucherOuvrage(id, retouche, version),
    onMutate: async ({ retouche }) => {
      await client.cancelQueries({ queryKey: cleDetail });
      const precedent = client.getQueryData<Ouvrage>(cleDetail);
      const listes = client.getQueriesData<DonneesListe>({ queryKey: clesOuvrages.listes() });
      const base = precedent ?? trouverDansListes(client, id);
      if (base !== undefined) {
        propagerOuvrage(client, { ...base, ...retouche });
      }
      return { precedent, listes };
    },
    onError: (_erreur, _variables, instantane) => {
      if (instantane === undefined) {
        return;
      }
      client.setQueryData(cleDetail, instantane.precedent);
      for (const [cle, donnees] of instantane.listes) {
        client.setQueryData(cle, donnees);
      }
    },
    onSuccess: (ouvrage) => propagerOuvrage(client, ouvrage),
    onSettled: () => {
      void client.invalidateQueries({ queryKey: clesOuvrages.tout });
    },
  });
}
