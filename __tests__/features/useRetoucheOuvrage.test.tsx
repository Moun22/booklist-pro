import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import { ErreurReseau } from '@/domain/erreurs';
import { clesOuvrages } from '@/features/books/cles';
import { useRetoucheOuvrage } from '@/features/books/useRetoucheOuvrage';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useRetoucheOuvrage', () => {
  it('applies the change to the cache at once and rolls it back when the server refuses', async () => {
    const client = creerClientDeTest();
    client.setQueryData(clesOuvrages.detail(ouvrageExemple.id), ouvrageExemple);
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson({ erreur: 'service_indisponible' }, 503))
      .mockResolvedValue(reponseJson(ouvrageExemple));

    const { result } = await renderHook(() => useRetoucheOuvrage(ouvrageExemple.id), {
      wrapper: creerWrapper(client),
    });

    await act(async () => {
      await expect(
        result.current.mutateAsync({ retouche: { lu: false }, version: 3 }),
      ).rejects.toBeInstanceOf(ErreurReseau);
    });

    expect(client.getQueryData(clesOuvrages.detail(ouvrageExemple.id))).toEqual(ouvrageExemple);
    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}`,
      expect.objectContaining({
        method: 'PATCH',
        body: '{"lu":false}',
        headers: expect.objectContaining({ 'If-Match': '3' }),
      }),
    );
  });

  it('keeps the server answer, with its new version, when the change is accepted', async () => {
    const client = creerClientDeTest();
    client.setQueryData(clesOuvrages.detail(ouvrageExemple.id), ouvrageExemple);
    const accepte = { ...ouvrageExemple, lu: false, version: 4 };
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson(accepte));

    const { result } = await renderHook(() => useRetoucheOuvrage(ouvrageExemple.id), {
      wrapper: creerWrapper(client),
    });

    await act(async () => {
      await result.current.mutateAsync({ retouche: { lu: false }, version: 3 });
    });

    expect(client.getQueryData(clesOuvrages.detail(ouvrageExemple.id))).toEqual(accepte);
  });
});
