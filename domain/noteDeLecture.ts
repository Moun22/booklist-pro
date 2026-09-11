import { z } from 'zod';

export const LIMITES_NOTE_DE_LECTURE = { contenuMax: 1000 } as const;

export const noteDeLectureSchema = z.object({
  id: z.string().min(1),
  livreId: z.string().min(1),
  contenu: z.string(),
  createdAt: z.string().min(1),
});

export type NoteDeLecture = z.infer<typeof noteDeLectureSchema>;

export type MessagesNoteDeLecture = {
  noteDeLectureVide: string;
  maxCaracteres: (max: number) => string;
};

export function creerContenuNoteSchema(m: MessagesNoteDeLecture) {
  return z
    .string()
    .trim()
    .min(1, m.noteDeLectureVide)
    .max(LIMITES_NOTE_DE_LECTURE.contenuMax, m.maxCaracteres(LIMITES_NOTE_DE_LECTURE.contenuMax));
}
