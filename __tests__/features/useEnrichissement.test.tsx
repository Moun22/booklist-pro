import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react-native';

import { reponseJson } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import { useEnrichissement } from '@/features/enrichissement/useEnrichissement';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useEnrichissement', () => {
  it('reports the editions found for a title', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        reponseJson({ numFound: 1, docs: [{ edition_count: 7, first_publish_year: 1987 }] }),
      );

    const { result } = await renderHook(() => useEnrichissement('La Cité des cendres'), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    expect(result.current.etat).toBe('recherche');
    await waitFor(() => expect(result.current.etat).toBe('trouve'));
    expect(result.current).toEqual({ etat: 'trouve', editions: 7, premiereAnnee: 1987 });
  });

  it('degrades silently when OpenLibrary cannot be reached', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));

    const { result } = await renderHook(() => useEnrichissement('Dune'), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    await waitFor(() => expect(result.current.etat).toBe('indisponible'));
  });

  it('never calls OpenLibrary for an empty title', async () => {
    const transport = jest.spyOn(globalThis, 'fetch');

    const { result } = await renderHook(() => useEnrichissement('   '), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    expect(result.current.etat).toBe('inactif');
    expect(transport).not.toHaveBeenCalled();
  });
});
