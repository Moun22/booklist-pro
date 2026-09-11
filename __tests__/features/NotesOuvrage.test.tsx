import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson, reponseVide } from '../helpers/fixtures';
import { renderWithProviders } from '../helpers/renderWithProviders';
import type { NoteDeLecture } from '@/domain/noteDeLecture';
import { NotesOuvrage } from '@/features/notes/NotesOuvrage';

const note: NoteDeLecture = {
  id: 'n1',
  livreId: ouvrageExemple.id,
  contenu: 'À conseiller aux lecteurs de Le Guin.',
  createdAt: '2026-09-12T14:32:00.000Z',
};

afterEach(() => {
  jest.restoreAllMocks();
});

describe('NotesOuvrage', () => {
  it('shows the empty state, refuses an empty note, then adds one and confirms it', async () => {
    // The simulated server keeps what it receives, like the real one answering the refetch.
    let servies: NoteDeLecture[] = [];
    const transport = jest.spyOn(globalThis, 'fetch').mockImplementation((_entree, init) => {
      if (init?.method === 'POST') {
        servies = [note, ...servies];
        return Promise.resolve(reponseJson(note, 201));
      }
      return Promise.resolve(reponseJson(servies));
    });

    await renderWithProviders(<NotesOuvrage livreId={ouvrageExemple.id} />);

    expect(await screen.findByText('Aucune note de lecture')).toBeTruthy();
    expect(screen.getByText('0 notes')).toBeTruthy();

    await fireEvent.press(screen.getByRole('button', { name: 'Ajouter la note' }));
    expect(screen.getByText('Écrivez la note avant de l’ajouter')).toBeTruthy();
    expect(transport).not.toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ method: 'POST' }),
    );

    await fireEvent.changeText(screen.getByLabelText('Nouvelle note'), note.contenu);
    await fireEvent.press(screen.getByRole('button', { name: 'Ajouter la note' }));

    expect(await screen.findByText('Note ajoutée')).toBeTruthy();
    expect(screen.getByText(note.contenu)).toBeTruthy();
    expect(screen.getByText('1 note')).toBeTruthy();
    expect(screen.getByLabelText('Nouvelle note').props.value).toBe('');
    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}/notes`,
      expect.objectContaining({ method: 'POST', body: JSON.stringify({ contenu: note.contenu }) }),
    );
  });

  it('asks before deleting a note, then sends the DELETE', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation((_entree, init) =>
        Promise.resolve(init?.method === 'DELETE' ? reponseVide() : reponseJson([note])),
      );

    await renderWithProviders(<NotesOuvrage livreId={ouvrageExemple.id} />);
    expect(await screen.findByText(note.contenu)).toBeTruthy();

    await fireEvent.press(screen.getByRole('button', { name: /^Supprimer la note du / }));
    expect(screen.getByText('Supprimer cette note ?')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Garder' }));
    expect(screen.queryByText('Supprimer cette note ?')).toBeNull();

    await fireEvent.press(screen.getByRole('button', { name: /^Supprimer la note du / }));
    await fireEvent.press(screen.getByRole('button', { name: 'Supprimer' }));

    await waitFor(() =>
      expect(transport).toHaveBeenCalledWith(
        `http://localhost:3000/books/${ouvrageExemple.id}/notes/n1`,
        expect.objectContaining({ method: 'DELETE' }),
      ),
    );
  });
});
