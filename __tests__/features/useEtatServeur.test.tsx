import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react-native';

import { reponseJson } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import { useEtatServeur } from '@/features/sync/useEtatServeur';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useEtatServeur', () => {
  it('reports the server as reachable once /health has answered', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson({ statut: 'ok', authRequise: false }));

    const { result } = await renderHook(() => useEtatServeur(), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    await waitFor(() => expect(result.current).toBe('joignable'));
    expect(transport).toHaveBeenCalledWith('http://localhost:3000/health', expect.anything());
  });

  it('reports the server as unreachable when the probe fails', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));

    const { result } = await renderHook(() => useEtatServeur(), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    await waitFor(() => expect(result.current).toBe('injoignable'));
  });
});
