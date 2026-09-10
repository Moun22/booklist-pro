import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import { useFonds } from '@/features/books/useFonds';

function pageDuFonds(numero: number, totalPages = 2) {
  return {
    items: [{ ...ouvrageExemple, id: `id-${numero}`, titre: `Titre ${numero}` }],
    page: numero,
    limit: 20,
    total: 41,
    totalPages,
  };
}

function creerWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useFonds', () => {
  it('loads the first page from the server and then the next one on demand', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson(pageDuFonds(1)))
      .mockResolvedValueOnce(reponseJson(pageDuFonds(2)));

    const { result } = await renderHook(() => useFonds({ q: 'dune' }), { wrapper: creerWrapper() });

    expect(result.current.chargementInitial).toBe(true);
    await waitFor(() => expect(result.current.chargementInitial).toBe(false));
    expect(result.current.total).toBe(41);
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

  it('exposes the error and recovers on retry', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson({ erreur: 'service_indisponible' }, 503))
      .mockResolvedValueOnce(reponseJson(pageDuFonds(1, 1)));

    const { result } = await renderHook(() => useFonds({}), { wrapper: creerWrapper() });

    await waitFor(() => expect(result.current.erreur).not.toBeNull());
    expect(result.current.ouvrages).toEqual([]);

    await act(async () => {
      result.current.reessayer();
    });

    await waitFor(() => expect(result.current.erreur).toBeNull());
    expect(result.current.ouvrages).toHaveLength(1);
  });
});
