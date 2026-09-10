import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { ToggleRow } from '@/components/ToggleRow';

describe('ToggleRow', () => {
  it('is a switch that exposes its state and its value label', async () => {
    await renderWithTheme(
      <ToggleRow label="Statut de lecture" valueLabel="Lu" checked={true} onToggle={() => {}} />,
    );

    expect(screen.getByRole('switch', { name: 'Statut de lecture', checked: true })).toBeTruthy();
    expect(screen.getByText('Lu')).toBeTruthy();
  });

  it('reports a toggle request on press', async () => {
    const onToggle = jest.fn();
    await renderWithTheme(
      <ToggleRow
        label="Statut de lecture"
        valueLabel="Non lu"
        checked={false}
        onToggle={onToggle}
      />,
    );

    await fireEvent.press(screen.getByRole('switch', { name: 'Statut de lecture' }));

    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
