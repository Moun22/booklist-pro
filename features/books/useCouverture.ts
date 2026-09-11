import { useMutation, useQueryClient } from '@tanstack/react-query';

import { propagerOuvrage } from './cacheOuvrages';
import { clesOuvrages } from './cles';
import { ErreurConflit } from '@/domain/erreurs';
import type { Ouvrage } from '@/domain/ouvrage';
import { retirerCouverture, televerserCouverture } from '@/services/api/couvertures';

type Televersement = { image: string; version: number };

export function useTeleverserCouverture(id: string) {
  const client = useQueryClient();
  return useMutation<Ouvrage, unknown, Televersement>({
    mutationFn: ({ image, version }) => televerserCouverture(id, image, version),
    onSuccess: (ouvrage) => propager(client, ouvrage),
    onError: (erreur) => reprendreLeServeur(client, erreur),
  });
}

export function useRetirerCouverture(id: string) {
  const client = useQueryClient();
  return useMutation<Ouvrage, unknown, number>({
    mutationFn: (version) => retirerCouverture(id, version),
    onSuccess: (ouvrage) => propager(client, ouvrage),
    onError: (erreur) => reprendreLeServeur(client, erreur),
  });
}

function propager(client: ReturnType<typeof useQueryClient>, ouvrage: Ouvrage) {
  propagerOuvrage(client, ouvrage);
  void client.invalidateQueries({ queryKey: clesOuvrages.listes() });
}

// A stale version means someone else changed the fiche: their version replaces ours on screen.
function reprendreLeServeur(client: ReturnType<typeof useQueryClient>, erreur: unknown) {
  if (erreur instanceof ErreurConflit) {
    propagerOuvrage(client, erreur.serveur);
  }
}
