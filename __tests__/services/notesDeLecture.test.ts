import { afterEach, describe, expect, it, jest } from '@jest/globals';

import { ouvrageExemple, reponseJson, reponseVide } from '../helpers/fixtures';
import { ajouterNote, listerNotes, supprimerNote } from '@/services/api/notesDeLecture';

const note = {
  id: 'n1',
  livreId: ouvrageExemple.id,
  contenu: 'À conseiller aux lecteurs de Le Guin.',
  createdAt: '2026-09-12T14:32:00.000Z',
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('services/api/notesDeLecture', () => {
  it('lists the notes of an ouvrage and validates each one', async () => {
    const transport = jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson([note]));

    const notes = await listerNotes(ouvrageExemple.id);

    expect(notes).toEqual([note]);
    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}/notes`,
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('rejects a list whose items are not notes', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson([{ id: 'n1' }]));

    await expect(listerNotes(ouvrageExemple.id)).rejects.toMatchObject({
      cause: 'reponse-invalide',
    });
  });

  it('posts the content of a new note', async () => {
    const transport = jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson(note, 201));

    const creee = await ajouterNote(ouvrageExemple.id, note.contenu);

    expect(creee).toEqual(note);
    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}/notes`,
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ contenu: note.contenu }) }),
    );
  });

  it('deletes a note and resolves on an empty answer', async () => {
    const transport = jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseVide());

    await expect(supprimerNote(ouvrageExemple.id, 'n1')).resolves.toBeUndefined();

    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}/notes/n1`,
      expect.objectContaining({ method: 'DELETE' }),
    );
  });
});
