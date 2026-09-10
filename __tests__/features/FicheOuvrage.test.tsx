import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import { renderWithProviders } from '../helpers/renderWithProviders';
import { FicheOuvrage } from '@/features/books/FicheOuvrage';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('FicheOuvrage', () => {
  it('shows the ouvrage and flips the read status through a PATCH guarded by If-Match', async () => {
    const nonLu = { ...ouvrageExemple, lu: false, version: 4 };
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson(ouvrageExemple))
      .mockResolvedValue(reponseJson(nonLu));

    await renderWithProviders(
      <FicheOuvrage id={ouvrageExemple.id} mode="volet" onFermer={() => {}} />,
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

  it('offers a retry when the ouvrage cannot be loaded', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(reponseJson({ erreur: 'service_indisponible' }, 503))
      .mockResolvedValue(reponseJson(ouvrageExemple));

    await renderWithProviders(
      <FicheOuvrage id={ouvrageExemple.id} mode="ecran" onFermer={() => {}} />,
    );

    const reessayer = await screen.findByRole('button', { name: 'Réessayer' });
    await fireEvent.press(reessayer);

    expect(await screen.findByText('La Cité des cendres')).toBeTruthy();
  });
});
