import { useQuery } from '@tanstack/react-query';

import { clesNotes } from './cles';
import type { NoteDeLecture } from '@/domain/noteDeLecture';
import { listerNotes } from '@/services/api/notesDeLecture';

export type NotesChargees = {
  notes: NoteDeLecture[];
  chargement: boolean;
  erreur: unknown;
  reessayer: () => void;
};

export function useNotesDeLecture(livreId: string): NotesChargees {
  const requete = useQuery<NoteDeLecture[]>({
    queryKey: clesNotes.parOuvrage(livreId),
    queryFn: ({ signal }) => listerNotes(livreId, signal),
  });

  return {
    notes: requete.data ?? [],
    chargement: requete.isPending,
    erreur: requete.isError ? requete.error : null,
    reessayer: () => {
      void requete.refetch();
    },
  };
}
