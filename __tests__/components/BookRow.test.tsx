import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { BookRow, type LigneOuvrage } from '@/components/BookRow';

const ligne: LigneOuvrage = {
  id: 'abc',
  titre: 'La Cité des cendres',
  detail: 'Ursula Le Guin · Le Bélial · 1987',
  note: '4/5',
  lu: true,
  coupDeCoeur: true,
  description: 'La Cité des cendres, Ursula Le Guin, 1987, lu, coup de coeur, note 4 sur 5',
};

describe('BookRow', () => {
  it('shows the title, the detail line and the rating', async () => {
    await renderWithTheme(<BookRow ligne={ligne} selectionnee={false} onPress={() => {}} />);

    expect(screen.getByText('La Cité des cendres')).toBeTruthy();
    expect(screen.getByText('Ursula Le Guin · Le Bélial · 1987')).toBeTruthy();
    expect(screen.getByText('4/5')).toBeTruthy();
  });

  it('describes the whole row to assistive technology and reports a press', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<BookRow ligne={ligne} selectionnee={true} onPress={onPress} />);

    const bouton = screen.getByRole('button', { name: ligne.description, selected: true });
    await fireEvent.press(bouton);

    expect(onPress).toHaveBeenCalledWith('abc');
  });
});
