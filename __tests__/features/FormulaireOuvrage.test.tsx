import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { ErreurValidation } from '@/domain/erreurs';
import { FormulaireOuvrage } from '@/features/books/FormulaireOuvrage';

async function remplirFormulaireValide() {
  await fireEvent.changeText(screen.getByLabelText('Titre'), ' Dune ');
  await fireEvent.changeText(screen.getByLabelText('Auteur'), 'Frank Herbert');
  await fireEvent.changeText(screen.getByLabelText('Année'), '1965');
}

describe('FormulaireOuvrage', () => {
  it('names every invalid field and sends nothing', async () => {
    const onSoumettre = jest.fn(async () => {});
    await renderWithTheme(<FormulaireOuvrage onSoumettre={onSoumettre} onAnnuler={() => {}} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Enregistrer' }));

    expect(await screen.findByText('Le titre est obligatoire')).toBeTruthy();
    expect(screen.getByText("L'auteur est obligatoire")).toBeTruthy();
    expect(screen.getByText("L'année est obligatoire")).toBeTruthy();
    expect(onSoumettre).not.toHaveBeenCalled();
  });

  it('submits the typed values, year converted to a number', async () => {
    const onSoumettre = jest.fn(async () => {});
    await renderWithTheme(<FormulaireOuvrage onSoumettre={onSoumettre} onAnnuler={() => {}} />);

    await remplirFormulaireValide();
    await fireEvent.press(screen.getByRole('switch', { name: 'Lecture' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Enregistrer' }));

    await waitFor(() =>
      expect(onSoumettre).toHaveBeenCalledWith({
        titre: 'Dune',
        auteur: 'Frank Herbert',
        editeur: '',
        annee: 1965,
        lu: true,
      }),
    );
  });

  it('shows a 422 answer under the field the server named', async () => {
    const onSoumettre = jest.fn(async () => {
      throw new ErreurValidation('Validation', { titre: 'titre déjà présent dans le fonds' });
    });
    await renderWithTheme(<FormulaireOuvrage onSoumettre={onSoumettre} onAnnuler={() => {}} />);

    await remplirFormulaireValide();
    await fireEvent.press(screen.getByRole('button', { name: 'Enregistrer' }));

    expect(await screen.findByText('titre déjà présent dans le fonds')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Enregistrer' })).toBeTruthy();
  });
});
