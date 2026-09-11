import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { StarRow } from '@/components/StarRow';

function rendre(value: number | null, onChange: (valeur: number | null) => void) {
  return renderWithTheme(
    <StarRow
      label="Note"
      value={value}
      max={5}
      valueLabel={value === null ? 'Sans note' : `${value}/5`}
      starLabel={(valeur) => `Noter ${valeur} sur 5`}
      removeLabel="Retirer la note"
      onChange={onChange}
    />,
  );
}

describe('StarRow', () => {
  it('offers one radio per star and reports the chosen rating', async () => {
    const onChange = jest.fn();
    await rendre(null, onChange);

    expect(screen.getAllByRole('radio')).toHaveLength(5);
    expect(screen.getByText('Sans note')).toBeTruthy();
    await fireEvent.press(screen.getByRole('radio', { name: 'Noter 3 sur 5' }));

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('marks the current rating and removes it when that star is pressed again', async () => {
    const onChange = jest.fn();
    await rendre(4, onChange);

    expect(screen.getByText('4/5')).toBeTruthy();
    await fireEvent.press(screen.getByRole('radio', { name: 'Retirer la note', checked: true }));

    expect(onChange).toHaveBeenCalledWith(null);
  });
});
