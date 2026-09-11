import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson, reponseVide } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import type { NoteDeLecture } from '@/domain/noteDeLecture';
import { clesNotes } from '@/features/notes/cles';
import { useNotesDeLecture } from '@/features/notes/useNotesDeLecture';
import { useSupprimerNote } from '@/features/notes/useSupprimerNote';

const premiere: NoteDeLecture = {
  id: 'n1',
  livreId: ouvrageExemple.id,
  contenu: 'Première note',
  createdAt: '2026-09-12T14:32:00.000Z',
};
const seconde: NoteDeLecture = { ...premiere, id: 'n2', contenu: 'Seconde note' };

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useNotesDeLecture', () => {
  it('loads the notes of the ouvrage from the server', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson([premiere, seconde]));

    const { result } = await renderHook(() => useNotesDeLecture(ouvrageExemple.id), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    await waitFor(() => expect(result.current.chargement).toBe(false));
    expect(result.current.notes.map((note) => note.id)).toEqual(['n1', 'n2']);
  });

  it('exposes the error and recovers on retry', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson({ erreur: 'service_indisponible' }, 503))
      .mockResolvedValue(reponseJson([premiere]));

    const { result } = await renderHook(() => useNotesDeLecture(ouvrageExemple.id), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    await waitFor(() => expect(result.current.erreur).not.toBeNull());
    await act(async () => {
      result.current.reessayer();
    });
    await waitFor(() => expect(result.current.erreur).toBeNull());
    expect(result.current.notes).toHaveLength(1);
  });
});

describe('useSupprimerNote', () => {
  it('removes the note from the cache at once and puts it back when the server refuses', async () => {
    const client = creerClientDeTest();
    const cle = clesNotes.parOuvrage(ouvrageExemple.id);
    client.setQueryData(cle, [premiere, seconde]);
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson({ erreur: 'service_indisponible' }, 503))
      .mockResolvedValue(reponseJson([premiere, seconde]));

    const { result } = await renderHook(() => useSupprimerNote(ouvrageExemple.id), {
      wrapper: creerWrapper(client),
    });

    await act(async () => {
      await expect(result.current.mutateAsync('n1')).rejects.toBeTruthy();
    });

    expect(client.getQueryData<NoteDeLecture[]>(cle)?.map((note) => note.id)).toEqual(['n1', 'n2']);
  });

  it('keeps the note out and marks the list stale when the server accepts', async () => {
    const client = creerClientDeTest();
    const cle = clesNotes.parOuvrage(ouvrageExemple.id);
    client.setQueryData(cle, [premiere, seconde]);
    const transport = jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseVide());

    const { result } = await renderHook(() => useSupprimerNote(ouvrageExemple.id), {
      wrapper: creerWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync('n1');
    });

    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}/notes/n1`,
      expect.objectContaining({ method: 'DELETE' }),
    );
    expect(client.getQueryData<NoteDeLecture[]>(cle)?.map((note) => note.id)).toEqual(['n2']);
    expect(client.getQueryState(cle)?.isInvalidated).toBe(true);
  });
});
