import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import { ErreurConflit } from '@/domain/erreurs';
import { clesOuvrages } from '@/features/books/cles';
import { useRetirerCouverture, useTeleverserCouverture } from '@/features/books/useCouverture';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useCouverture', () => {
  it('keeps the server answer in the fiche cache once the cover is uploaded', async () => {
    const client = creerClientDeTest();
    client.setQueryData(clesOuvrages.detail(ouvrageExemple.id), ouvrageExemple);
    const accepte = { ...ouvrageExemple, couverture: '/covers/x.jpg', version: 4 };
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson(accepte));

    const { result } = await renderHook(() => useTeleverserCouverture(ouvrageExemple.id), {
      wrapper: creerWrapper(client),
    });
    await act(async () => {
      await result.current.mutateAsync({ image: 'data:image/jpeg;base64,AAAA', version: 3 });
    });

    expect(client.getQueryData(clesOuvrages.detail(ouvrageExemple.id))).toEqual(accepte);
  });

  it('shows the server version of the fiche when the cover change hits a conflict', async () => {
    const client = creerClientDeTest();
    client.setQueryData(clesOuvrages.detail(ouvrageExemple.id), ouvrageExemple);
    const serveur = { ...ouvrageExemple, titre: 'Modifié ailleurs', version: 9 };
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        reponseJson({ erreur: 'conflit', message: 'Modifié', serveur, versionAttendue: 9 }, 409),
      );

    const { result } = await renderHook(() => useRetirerCouverture(ouvrageExemple.id), {
      wrapper: creerWrapper(client),
    });
    await act(async () => {
      await expect(result.current.mutateAsync(3)).rejects.toBeInstanceOf(ErreurConflit);
    });

    expect(client.getQueryData(clesOuvrages.detail(ouvrageExemple.id))).toEqual(serveur);
  });
});
