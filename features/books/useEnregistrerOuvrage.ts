import { useMutation, useQueryClient } from '@tanstack/react-query';

import { propagerOuvrage } from './cacheOuvrages';
import { clesOuvrages } from './cles';
import { ErreurConflit } from '@/domain/erreurs';
import type { Ouvrage, OuvrageValide } from '@/domain/ouvrage';
import { creerOuvrage, remplacerOuvrage } from '@/services/api/ouvrages';

export function useCreerOuvrage() {
  const client = useQueryClient();
  return useMutation<Ouvrage, unknown, OuvrageValide>({
    mutationFn: creerOuvrage,
    onSuccess: (ouvrage) => {
      client.setQueryData(clesOuvrages.detail(ouvrage.id), ouvrage);
      void client.invalidateQueries({ queryKey: clesOuvrages.listes() });
    },
  });
}

type Remplacement = {
  saisie: OuvrageValide;
  version: number;
};

export function useRemplacerOuvrage(id: string) {
  const client = useQueryClient();
  return useMutation<Ouvrage, unknown, Remplacement>({
    mutationFn: ({ saisie, version }) => remplacerOuvrage(id, saisie, version),
    onSuccess: (ouvrage) => {
      propagerOuvrage(client, ouvrage);
      void client.invalidateQueries({ queryKey: clesOuvrages.listes() });
    },
    onError: (erreur) => {
      if (erreur instanceof ErreurConflit) {
        propagerOuvrage(client, erreur.serveur);
      }
    },
  });
}
