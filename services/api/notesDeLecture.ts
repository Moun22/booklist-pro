import { z } from 'zod';

import { clientHttp } from './client';
import { noteDeLectureSchema, type NoteDeLecture } from '@/domain/noteDeLecture';

const notesSchema = z.array(noteDeLectureSchema);

export function listerNotes(livreId: string, signal?: AbortSignal): Promise<NoteDeLecture[]> {
  return clientHttp.requeter({ chemin: cheminNotes(livreId), signal }, notesSchema);
}

export function ajouterNote(livreId: string, contenu: string): Promise<NoteDeLecture> {
  return clientHttp.requeter(
    { methode: 'POST', chemin: cheminNotes(livreId), corps: { contenu } },
    noteDeLectureSchema,
  );
}

export async function supprimerNote(livreId: string, noteId: string): Promise<void> {
  await clientHttp.requeter({
    methode: 'DELETE',
    chemin: `${cheminNotes(livreId)}/${encodeURIComponent(noteId)}`,
  });
}

function cheminNotes(livreId: string): string {
  return `/books/${encodeURIComponent(livreId)}/notes`;
}
