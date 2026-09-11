import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook, waitFor } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import type { Ouvrage } from '@/domain/ouvrage';
import { useSuppression } from '@/features/books/SuppressionProvider';
import { useFonds } from '@/features/books/useFonds';
import { motion } from '@/theme/tokens';

function pageDuFonds(numero: number, totalPages = 2) {
  return {
    items: [{ ...ouvrageExemple, id: `id-${numero}`, titre: `Titre ${numero}` }],
    page: numero,
    limit: 20,
    total: 41,
    totalPages,
  };
}

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('useFonds', () => {
  it('loads the first page from the server and then the next one on demand', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson(pageDuFonds(1)))
      .mockResolvedValueOnce(reponseJson(pageDuFonds(2)));

    const { result } = await renderHook(() => useFonds({ q: 'dune' }), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    expect(result.current.chargementInitial).toBe(true);
    await waitFor(() => expect(result.current.chargementInitial).toBe(false));
    expect(result.current.total).toBe(41);
    expect(result.current.enSortieId).toBeNull();
    expect(result.current.ouvrages.map((ouvrage) => ouvrage.id)).toEqual(['id-1']);
    expect(result.current.aPageSuivante).toBe(true);
    expect(transport).toHaveBeenCalledWith(
      'http://localhost:3000/books?q=dune&page=1&limit=20',
      expect.anything(),
    );

    await act(async () => {
      result.current.chargerPageSuivante();
    });

    await waitFor(() => expect(result.current.ouvrages).toHaveLength(2));
    expect(result.current.aPageSuivante).toBe(false);
  });

  it('hides an ouvrage whose deletion is still undoable, even from a list fetched meanwhile', async () => {
    jest.useFakeTimers();
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.resolve(reponseJson(pageDuFonds(1, 1))));

    const { result } = await renderHook(
      () => ({ fonds: useFonds({}), suppression: useSuppression() }),
      { wrapper: creerWrapper(creerClientDeTest()) },
    );
    await waitFor(() => expect(result.current.fonds.ouvrages).toHaveLength(1));
    const ouvrage: Ouvrage = { ...ouvrageExemple, id: 'id-1', titre: 'Titre 1' };

    await act(async () => {
      result.current.suppression.programmer(ouvrage);
    });
    expect(result.current.fonds.enSortieId).toBe(ouvrage.id);
    expect(result.current.fonds.ouvrages).toHaveLength(1);

    await act(async () => {
      jest.advanceTimersByTime(motion.quick);
    });
    expect(result.current.fonds.ouvrages).toEqual([]);

    await act(async () => {
      result.current.fonds.reessayer();
    });

    await waitFor(() => expect(transport).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(result.current.fonds.actualisation).toBe(false));
    expect(result.current.fonds.enSortieId).toBeNull();
    expect(result.current.fonds.ouvrages).toEqual([]);
    expect(result.current.fonds.total).toBe(40);
  });

  it('exposes the error and recovers on retry', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson({ erreur: 'service_indisponible' }, 503))
      .mockResolvedValueOnce(reponseJson(pageDuFonds(1, 1)));

    const { result } = await renderHook(() => useFonds({}), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    await waitFor(() => expect(result.current.erreur).not.toBeNull());
    expect(result.current.ouvrages).toEqual([]);

    await act(async () => {
      result.current.reessayer();
    });

    await waitFor(() => expect(result.current.erreur).toBeNull());
    expect(result.current.ouvrages).toHaveLength(1);
  });
});
