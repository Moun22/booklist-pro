import { describe, expect, it } from '@jest/globals';

import {
  contenuNoteSchema,
  LIMITES_NOTE_DE_LECTURE,
  noteDeLectureSchema,
} from '@/domain/noteDeLecture';

const noteServie = {
  id: 'n1',
  livreId: 'l1',
  contenu: 'À conseiller aux lecteurs de Le Guin.',
  createdAt: '2026-09-12T14:32:00.000Z',
};

describe('noteDeLectureSchema', () => {
  it('accepts a note as the API serves it', () => {
    expect(noteDeLectureSchema.parse(noteServie)).toEqual(noteServie);
  });

  it('rejects a note without an id or a timestamp', () => {
    expect(noteDeLectureSchema.safeParse({ ...noteServie, id: '' }).success).toBe(false);
    expect(noteDeLectureSchema.safeParse({ ...noteServie, createdAt: undefined }).success).toBe(
      false,
    );
  });
});

describe('contenuNoteSchema', () => {
  it('trims the text and refuses an empty note', () => {
    expect(contenuNoteSchema.parse('  Une note  ')).toBe('Une note');
    const vide = contenuNoteSchema.safeParse('   ');
    expect(vide.success).toBe(false);
    expect(vide.error?.issues[0]?.message).toBe('Écrivez la note avant de l’ajouter');
  });

  it('keeps a note of exactly the maximum length and refuses one character more', () => {
    const max = 'a'.repeat(LIMITES_NOTE_DE_LECTURE.contenuMax);
    expect(contenuNoteSchema.safeParse(max).success).toBe(true);
    const trop = contenuNoteSchema.safeParse(`${max}a`);
    expect(trop.success).toBe(false);
    expect(trop.error?.issues[0]?.message).toBe('1000 caractères maximum');
  });
});
