import { z } from 'zod';

export const LIMITES_NOTE_DE_LECTURE = { contenuMax: 1000 } as const;

export const noteDeLectureSchema = z.object({
  id: z.string().min(1),
  livreId: z.string().min(1),
  contenu: z.string(),
  createdAt: z.string().min(1),
});

export type NoteDeLecture = z.infer<typeof noteDeLectureSchema>;

export const contenuNoteSchema = z
  .string()
  .trim()
  .min(1, 'Écrivez la note avant de l’ajouter')
  .max(
    LIMITES_NOTE_DE_LECTURE.contenuMax,
    `${LIMITES_NOTE_DE_LECTURE.contenuMax} caractères maximum`,
  );
