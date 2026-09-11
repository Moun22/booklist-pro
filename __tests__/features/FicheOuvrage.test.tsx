import { afterEach, describe, expect, it, jest } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import { renderWithProviders } from '../helpers/renderWithProviders';
import { FicheOuvrage } from '@/features/books/FicheOuvrage';

afterEach(async () => {
  jest.restoreAllMocks();
  await SecureStore.deleteItemAsync('session.jetons');
  await AsyncStorage.clear();
});

// The fiche loads the ouvrage, its notes, the OpenLibrary editions and the server mark side by
// side: answers are routed by URL.
function transportDeFiche(reponseOuvrage: () => Response) {
  return jest.spyOn(globalThis, 'fetch').mockImplementation((entree) => {
    const url = String(entree);
    if (url.endsWith('/notes')) {
      return Promise.resolve(reponseJson([]));
    }
    if (url.endsWith('/health')) {
      return Promise.resolve(reponseJson({ statut: 'ok', authRequise: false }));
    }
    if (url.includes('openlibrary.org')) {
      return Promise.resolve(reponseJson({ numFound: 0, docs: [] }));
    }
    return Promise.resolve(reponseOuvrage());
  });
}

describe('FicheOuvrage', () => {
  it('shows the ouvrage and flips the read status through a PATCH guarded by If-Match', async () => {
    const nonLu = { ...ouvrageExemple, lu: false, version: 4 };
    let reponses = 0;
    const transport = transportDeFiche(() =>
      reponseJson(reponses++ === 0 ? ouvrageExemple : nonLu),
    );

    await renderWithProviders(
      <FicheOuvrage
        id={ouvrageExemple.id}
        mode="volet"
        onFermer={() => {}}
        onModifier={() => {}}
      />,
    );

    expect(await screen.findByText('La Cité des cendres')).toBeTruthy();
    expect(screen.getByText('Ursula Le Guin')).toBeTruthy();
    expect(screen.getByText('4/5')).toBeTruthy();

    await fireEvent.press(screen.getByRole('switch', { name: 'Lecture', checked: true }));

    await waitFor(() =>
      expect(screen.getByRole('switch', { name: 'Lecture', checked: false })).toBeTruthy(),
    );
    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}`,
      expect.objectContaining({
        method: 'PATCH',
        body: '{"lu":false}',
        headers: expect.objectContaining({ 'If-Match': '3' }),
      }),
    );
  });

  it('flips the coup de coeur at once through the same PATCH', async () => {
    const favori = { ...ouvrageExemple, favori: true, version: 4 };
    let reponses = 0;
    const transport = transportDeFiche(() =>
      reponseJson(reponses++ === 0 ? ouvrageExemple : favori),
    );

    await renderWithProviders(
      <FicheOuvrage
        id={ouvrageExemple.id}
        mode="ecran"
        onFermer={() => {}}
        onModifier={() => {}}
      />,
    );
    await screen.findByText('La Cité des cendres');

    await fireEvent.press(screen.getByRole('switch', { name: 'Coup de coeur', checked: false }));

    await waitFor(() =>
      expect(screen.getByRole('switch', { name: 'Coup de coeur', checked: true })).toBeTruthy(),
    );
    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}`,
      expect.objectContaining({ method: 'PATCH', body: '{"favori":true}' }),
    );
  });

  it('rates the ouvrage with a star through the same PATCH', async () => {
    const note = { ...ouvrageExemple, note: 3, version: 4 };
    let reponses = 0;
    const transport = transportDeFiche(() => reponseJson(reponses++ === 0 ? ouvrageExemple : note));

    await renderWithProviders(
      <FicheOuvrage
        id={ouvrageExemple.id}
        mode="volet"
        onFermer={() => {}}
        onModifier={() => {}}
      />,
    );
    await screen.findByText('La Cité des cendres');

    await fireEvent.press(screen.getByRole('radio', { name: 'Noter 3 sur 5' }));

    await waitFor(() => expect(screen.getByText('3/5')).toBeTruthy());
    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}`,
      expect.objectContaining({ method: 'PATCH', body: '{"note":3}' }),
    );
  });

  it('shows a read-only account the same rows as values, without any write action', async () => {
    await SecureStore.setItemAsync(
      'session.jetons',
      JSON.stringify({ accessToken: 'a', refreshToken: 'r' }),
    );
    await AsyncStorage.setItem(
      'session.utilisateur',
      JSON.stringify({ id: 'u2', email: 'lecteur@booklist.fr', role: 'lecteur' }),
    );
    transportDeFiche(() => reponseJson(ouvrageExemple));

    await renderWithProviders(
      <FicheOuvrage
        id={ouvrageExemple.id}
        mode="ecran"
        onFermer={() => {}}
        onModifier={() => {}}
      />,
    );

    expect(await screen.findByText('La Cité des cendres')).toBeTruthy();
    expect(screen.getByText('4/5')).toBeTruthy();
    expect(screen.getByText('Lu')).toBeTruthy();
    expect(screen.queryByRole('switch')).toBeNull();
    expect(screen.queryByRole('radio')).toBeNull();
    for (const action of ['Supprimer', 'Modifier', 'Remplacer la couverture', 'Ajouter la note']) {
      expect(screen.queryByRole('button', { name: action })).toBeNull();
    }
  });

  it('offers a retry when the ouvrage cannot be loaded', async () => {
    let reponses = 0;
    transportDeFiche(() =>
      reponses++ === 0
        ? reponseJson({ erreur: 'service_indisponible' }, 503)
        : reponseJson(ouvrageExemple),
    );

    await renderWithProviders(
      <FicheOuvrage
        id={ouvrageExemple.id}
        mode="ecran"
        onFermer={() => {}}
        onModifier={() => {}}
      />,
    );

    const reessayer = await screen.findByRole('button', { name: 'Réessayer' });
    await fireEvent.press(reessayer);

    expect(await screen.findByText('La Cité des cendres')).toBeTruthy();
  });
});
