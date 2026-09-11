import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clesNotes } from './cles';
import type { NoteDeLecture } from '@/domain/noteDeLecture';
import { ajouterNote } from '@/services/api/notesDeLecture';

export function useAjouterNote(livreId: string) {
  const client = useQueryClient();
  const cle = clesNotes.parOuvrage(livreId);

  return useMutation<NoteDeLecture, unknown, string>({
    mutationFn: (contenu) => ajouterNote(livreId, contenu),
    onSuccess: (note) => {
      client.setQueryData<NoteDeLecture[]>(cle, (notes) => [note, ...(notes ?? [])]);
      void client.invalidateQueries({ queryKey: cle });
    },
  });
}
