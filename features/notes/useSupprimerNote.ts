import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clesNotes } from './cles';
import type { NoteDeLecture } from '@/domain/noteDeLecture';
import { supprimerNote } from '@/services/api/notesDeLecture';

type Instantane = {
  notes: NoteDeLecture[] | undefined;
};

export function useSupprimerNote(livreId: string) {
  const client = useQueryClient();
  const cle = clesNotes.parOuvrage(livreId);

  return useMutation<void, unknown, string, Instantane>({
    mutationFn: (noteId) => supprimerNote(livreId, noteId),
    onMutate: async (noteId) => {
      await client.cancelQueries({ queryKey: cle });
      const notes = client.getQueryData<NoteDeLecture[]>(cle);
      client.setQueryData<NoteDeLecture[]>(cle, (courantes) =>
        courantes?.filter((note) => note.id !== noteId),
      );
      return { notes };
    },
    onError: (_erreur, _noteId, instantane) => {
      if (instantane !== undefined) {
        client.setQueryData(cle, instantane.notes);
      }
    },
    onSettled: () => {
      void client.invalidateQueries({ queryKey: cle });
    },
  });
}
