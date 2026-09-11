import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import { renderWithProviders } from '../helpers/renderWithProviders';
import { FicheOuvrage } from '@/features/books/FicheOuvrage';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('FicheOuvrage, suppression', () => {
  it('asks for confirmation, then schedules the deletion, closes and offers to undo', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.resolve(reponseJson(ouvrageExemple)));
    const onFermer = jest.fn();

    await renderWithProviders(
      <FicheOuvrage
        id={ouvrageExemple.id}
        mode="volet"
        onFermer={onFermer}
        onModifier={() => {}}
      />,
    );
    await screen.findByText('La Cité des cendres');

    await fireEvent.press(screen.getByRole('button', { name: 'Supprimer' }));
    expect(screen.getByText('Supprimer cet ouvrage du fonds ?')).toBeTruthy();
    expect(onFermer).not.toHaveBeenCalled();

    await fireEvent.press(screen.getByRole('button', { name: 'Supprimer' }));

    expect(onFermer).toHaveBeenCalledTimes(1);
    expect(await screen.findByText('« La Cité des cendres » supprimé')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Annuler' })).toBeTruthy();
  });

  it('keeps the ouvrage when the librarian changes their mind', async () => {
    jest
      .spyOn(globalThis, 'fetch')
      .mockImplementation(() => Promise.resolve(reponseJson(ouvrageExemple)));
    const onFermer = jest.fn();

    await renderWithProviders(
      <FicheOuvrage
        id={ouvrageExemple.id}
        mode="ecran"
        onFermer={onFermer}
        onModifier={() => {}}
      />,
    );
    await screen.findByText('La Cité des cendres');

    await fireEvent.press(screen.getByRole('button', { name: 'Supprimer' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Garder' }));

    expect(screen.queryByText('Supprimer cet ouvrage du fonds ?')).toBeNull();
    expect(screen.getByRole('button', { name: 'Modifier' })).toBeTruthy();
    expect(onFermer).not.toHaveBeenCalled();
  });
});
