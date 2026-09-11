import { afterEach, describe, expect, it, jest } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { reponseJson } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import { SessionProvider, useSession } from '@/features/auth/SessionProvider';
import { useFonds } from '@/features/books/useFonds';
import { PreferencesProvider } from '@/features/preferences/PreferencesProvider';

function AvecSonde({ children }: { children: ReactNode }) {
  return (
    <PreferencesProvider>
      <QueryClientProvider client={creerClientDeTest()}>
        <SessionProvider sonderServeur>{children}</SessionProvider>
      </QueryClientProvider>
    </PreferencesProvider>
  );
}

const lecteur = { id: 'u2', email: 'lecteur@booklist.fr', role: 'lecteur' };
const editeur = { id: 'u1', email: 'editeur@booklist.fr', role: 'editeur' };

afterEach(async () => {
  jest.restoreAllMocks();
  await SecureStore.deleteItemAsync('session.jetons');
  await AsyncStorage.clear();
});

describe('SessionProvider', () => {
  it('restores a stored session and says whether the account may write', async () => {
    await SecureStore.setItemAsync(
      'session.jetons',
      JSON.stringify({ accessToken: 'a', refreshToken: 'r' }),
    );
    await AsyncStorage.setItem('session.utilisateur', JSON.stringify(lecteur));

    const { result } = await renderHook(() => useSession(), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    await waitFor(() => expect(result.current.etat).toBe('connecte'));
    expect(result.current.utilisateur?.email).toBe('lecteur@booklist.fr');
    expect(result.current.authRequise).toBe(true);
    expect(result.current.peutEcrire).toBe(false);
  });

  it('signs in, sends the token afterwards, and signs out clearing everything', async () => {
    const transport = jest.spyOn(globalThis, 'fetch').mockImplementation((entree) => {
      if (String(entree).endsWith('/auth/login')) {
        return Promise.resolve(
          reponseJson({ accessToken: 'acces', refreshToken: 'r', utilisateur: editeur }),
        );
      }
      return Promise.resolve(
        reponseJson({ items: [], page: 1, limit: 20, total: 0, totalPages: 1 }),
      );
    });

    const { result } = await renderHook(() => ({ session: useSession(), fonds: useFonds({}) }), {
      wrapper: creerWrapper(creerClientDeTest()),
    });
    await waitFor(() => expect(result.current.session.etat).toBe('anonyme'));
    expect(result.current.session.peutEcrire).toBe(true);

    await act(async () => {
      await result.current.session.connexion('editeur@booklist.fr', 'editeur123');
    });

    expect(result.current.session.etat).toBe('connecte');
    expect(result.current.session.peutEcrire).toBe(true);
    expect(await SecureStore.getItemAsync('session.jetons')).toContain('"accessToken":"acces"');
    expect(await AsyncStorage.getItem('session.utilisateur')).toContain('editeur@booklist.fr');
    await waitFor(() =>
      expect(transport).toHaveBeenCalledWith(
        expect.stringContaining('/books'),
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: 'Bearer acces' }),
        }),
      ),
    );

    await act(async () => {
      await result.current.session.deconnexion();
    });

    expect(result.current.session.etat).toBe('anonyme');
    expect(result.current.session.utilisateur).toBeNull();
    expect(await SecureStore.getItemAsync('session.jetons')).toBeNull();
    expect(await AsyncStorage.getItem('session.utilisateur')).toBeNull();
  });

  it('asks the server at startup whether it wants a token, before any screen shows', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson({ statut: 'ok', authRequise: true }));

    const { result } = await renderHook(() => useSession(), { wrapper: AvecSonde });

    await waitFor(() => expect(result.current.etat).toBe('anonyme'));
    expect(result.current.authRequise).toBe(true);
    expect(transport).toHaveBeenCalledWith(
      'http://localhost:3000/health',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('asks for a login the first time the server refuses a request without a token', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson({ erreur: 'jeton_absent' }, 401));

    const { result } = await renderHook(() => ({ session: useSession(), fonds: useFonds({}) }), {
      wrapper: creerWrapper(creerClientDeTest()),
    });

    await waitFor(() => expect(result.current.session.authRequise).toBe(true));
    expect(result.current.session.etat).toBe('anonyme');
    expect(result.current.session.peutEcrire).toBe(false);
  });
});
