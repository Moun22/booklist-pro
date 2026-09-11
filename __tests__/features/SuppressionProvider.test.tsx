import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, fireEvent, renderHook, screen, waitFor } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson, reponseVide } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import type { Ouvrage } from '@/domain/ouvrage';
import type { DonneesListe } from '@/features/books/cacheOuvrages';
import { clesOuvrages } from '@/features/books/cles';
import { DELAI_ANNULATION_MS, useSuppression } from '@/features/books/SuppressionProvider';
import { motion } from '@/theme/tokens';

const autre: Ouvrage = { ...ouvrageExemple, id: 'autre', titre: 'Autre' };
const cle = clesOuvrages.liste({});

function listeAvec(...ouvrages: Ouvrage[]): DonneesListe {
  return {
    pageParams: [1],
    pages: [{ items: ouvrages, page: 1, limit: 20, total: ouvrages.length, totalPages: 1 }],
  };
}

function idsDeLaListe(client: ReturnType<typeof creerClientDeTest>) {
  const donnees = client.getQueryData<DonneesListe>(cle);
  return donnees?.pages[0]?.items.map((ouvrage) => ouvrage.id);
}

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('SuppressionProvider', () => {
  it('lets the row fade, drops it from the lists, and only sends the DELETE after the delay', async () => {
    const client = creerClientDeTest();
    client.setQueryData(cle, listeAvec(ouvrageExemple, autre));
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.resolve(reponseVide()));

    const { result } = await renderHook(() => useSuppression(), { wrapper: creerWrapper(client) });
    await act(async () => {
      result.current.programmer(ouvrageExemple);
    });

    expect(result.current.enAttente).toEqual({ ouvrage: ouvrageExemple, retiree: false });
    expect(idsDeLaListe(client)).toEqual([ouvrageExemple.id, 'autre']);
    expect(screen.getByText('« La Cité des cendres » supprimé')).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(motion.quick);
    });

    expect(result.current.enAttente).toEqual({ ouvrage: ouvrageExemple, retiree: true });
    expect(idsDeLaListe(client)).toEqual(['autre']);
    expect(client.getQueryData<DonneesListe>(cle)?.pages[0]?.total).toBe(1);
    expect(transport).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(DELAI_ANNULATION_MS);
    });

    await waitFor(() =>
      expect(transport).toHaveBeenCalledWith(
        `http://localhost:3000/books/${ouvrageExemple.id}`,
        expect.objectContaining({ method: 'DELETE' }),
      ),
    );
  });

  it('puts the ouvrage back and never calls the server when the librarian cancels in time', async () => {
    const client = creerClientDeTest();
    client.setQueryData(cle, listeAvec(ouvrageExemple, autre));
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.resolve(reponseVide()));

    const { result } = await renderHook(() => useSuppression(), { wrapper: creerWrapper(client) });
    await act(async () => {
      result.current.programmer(ouvrageExemple);
      jest.advanceTimersByTime(2000);
    });
    expect(idsDeLaListe(client)).toEqual(['autre']);

    await act(async () => {
      result.current.annuler();
    });

    expect(result.current.enAttente).toBeNull();
    expect(result.current.refugeId).toBe(ouvrageExemple.id);
    expect(idsDeLaListe(client)).toEqual([ouvrageExemple.id, 'autre']);
    expect(client.getQueryData<DonneesListe>(cle)?.pages[0]?.total).toBe(2);
    expect(screen.queryByRole('button', { name: 'Annuler' })).toBeNull();
    expect(screen.getByText('« La Cité des cendres » conservé')).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(DELAI_ANNULATION_MS);
    });
    expect(transport).not.toHaveBeenCalled();
  });

  it('hands focus to the neighbouring row when the bar expires while still holding it', async () => {
    const client = creerClientDeTest();
    client.setQueryData(cle, listeAvec(ouvrageExemple, autre));
    jest.spyOn(globalThis, 'fetch').mockImplementation(() => Promise.resolve(reponseVide()));

    const { result } = await renderHook(() => useSuppression(), { wrapper: creerWrapper(client) });
    await act(async () => {
      result.current.programmer(ouvrageExemple);
      result.current.nommerVoisine('autre');
    });
    await fireEvent(screen.getByRole('button', { name: 'Annuler' }), 'focus');
    await act(async () => {
      jest.advanceTimersByTime(DELAI_ANNULATION_MS);
    });

    expect(result.current.enAttente).toBeNull();
    expect(result.current.refugeId).toBe('autre');

    await act(async () => {
      result.current.oublierRefuge();
    });
    expect(result.current.refugeId).toBeNull();
  });

  it('also puts back an ouvrage in a list that arrived during the fade', async () => {
    const client = creerClientDeTest();
    jest.spyOn(globalThis, 'fetch').mockImplementation(() => Promise.resolve(reponseVide()));

    const { result } = await renderHook(() => useSuppression(), { wrapper: creerWrapper(client) });
    await act(async () => {
      result.current.programmer(ouvrageExemple);
    });
    client.setQueryData(cle, listeAvec(ouvrageExemple, autre));
    await act(async () => {
      jest.advanceTimersByTime(motion.quick);
    });
    expect(idsDeLaListe(client)).toEqual(['autre']);

    await act(async () => {
      result.current.annuler();
    });

    expect(idsDeLaListe(client)).toEqual([ouvrageExemple.id, 'autre']);
  });

  it('restores the lists and offers a retry when the server refuses', async () => {
    const client = creerClientDeTest();
    client.setQueryData(cle, listeAvec(ouvrageExemple, autre));
    jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() =>
        Promise.resolve(reponseJson({ erreur: 'service_indisponible' }, 503)),
      );

    const { result } = await renderHook(() => useSuppression(), { wrapper: creerWrapper(client) });
    await act(async () => {
      result.current.programmer(ouvrageExemple);
    });
    await act(async () => {
      jest.advanceTimersByTime(DELAI_ANNULATION_MS);
    });

    await waitFor(() =>
      expect(screen.getByText("« La Cité des cendres » n'a pas pu être supprimé")).toBeTruthy(),
    );
    expect(idsDeLaListe(client)).toEqual([ouvrageExemple.id, 'autre']);
    expect(screen.getByRole('button', { name: 'Réessayer' })).toBeTruthy();
  });
});
