import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import { renderWithProviders } from '../helpers/renderWithProviders';
import { CouvertureOuvrage } from '@/features/books/CouvertureOuvrage';
import { choisirCouverture } from '@/services/plateforme/image';

jest.mock('@/services/plateforme/image', () => ({
  choisirCouverture: jest.fn(),
}));

afterEach(() => {
  jest.restoreAllMocks();
  jest.mocked(choisirCouverture).mockReset();
});

describe('CouvertureOuvrage', () => {
  it('offers the way back to the original cover only once a file has been uploaded', async () => {
    const { rerender } = await renderWithProviders(
      <CouvertureOuvrage ouvrage={{ ...ouvrageExemple, couverture: '/covers/abc.svg' }} />,
    );
    expect(screen.getByRole('button', { name: 'Remplacer la couverture' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Couverture d’origine' })).toBeNull();

    await rerender(
      <CouvertureOuvrage ouvrage={{ ...ouvrageExemple, couverture: '/covers/abc.jpg' }} />,
    );
    expect(screen.getByRole('button', { name: 'Couverture d’origine' })).toBeTruthy();
  });

  it('sends nothing when the picker is closed, and the resized picture when one is chosen', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson({ ...ouvrageExemple, couverture: '/covers/x.jpg' }));
    jest
      .mocked(choisirCouverture)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce('data:image/jpeg;base64,AAAA');

    await renderWithProviders(<CouvertureOuvrage ouvrage={ouvrageExemple} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Remplacer la couverture' }));
    await waitFor(() => expect(choisirCouverture).toHaveBeenCalledTimes(1));
    expect(transport).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByRole('button', { name: 'Remplacer la couverture' }));

    await waitFor(() =>
      expect(transport).toHaveBeenCalledWith(
        `http://localhost:3000/books/${ouvrageExemple.id}/cover`,
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ image: 'data:image/jpeg;base64,AAAA' }),
          headers: expect.objectContaining({ 'If-Match': '3' }),
        }),
      ),
    );
  });

  it('says why the server refused a picture', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        reponseJson({ erreur: 'image_trop_lourde', message: 'Image de 900 Ko.' }, 413),
      );
    jest.mocked(choisirCouverture).mockResolvedValue('data:image/jpeg;base64,AAAA');

    await renderWithProviders(<CouvertureOuvrage ouvrage={ouvrageExemple} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Remplacer la couverture' }));

    expect(await screen.findByText(/Couverture refusée/)).toBeTruthy();
  });

  it('hides the cover actions from a read-only account', async () => {
    await renderWithProviders(<CouvertureOuvrage ouvrage={ouvrageExemple} lectureSeule />);

    expect(screen.getByText('La Cité des cendres')).toBeTruthy();
    expect(screen.queryByRole('button', { name: 'Remplacer la couverture' })).toBeNull();
  });
});
