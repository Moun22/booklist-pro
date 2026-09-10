import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { SearchField } from '@/components/SearchField';

describe('SearchField', () => {
  it('exposes the field to assistive technology by its label', async () => {
    await renderWithTheme(<SearchField value="" onChangeText={() => {}} label="Rechercher" />);

    expect(screen.getByLabelText('Rechercher')).toBeTruthy();
  });

  it('forwards every keystroke to the parent', async () => {
    const onChangeText = jest.fn();
    await renderWithTheme(<SearchField value="" onChangeText={onChangeText} label="Rechercher" />);

    await fireEvent.changeText(screen.getByLabelText('Rechercher'), 'dune');

    expect(onChangeText).toHaveBeenCalledWith('dune');
  });
});
