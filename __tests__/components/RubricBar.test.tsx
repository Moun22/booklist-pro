import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { RubricBar } from '@/components/RubricBar';

const items = [
  { key: 'all', label: 'Fonds' },
  { key: 'lu', label: 'Lus' },
];

describe('RubricBar', () => {
  it('marks the active rubric as the selected tab', async () => {
    await renderWithTheme(
      <RubricBar items={items} activeKey="lu" onSelect={() => {}} label="Filtrer" />,
    );

    expect(screen.getByRole('tab', { name: 'Lus', selected: true })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Fonds', selected: false })).toBeTruthy();
  });

  it('reports the pressed rubric key', async () => {
    const onSelect = jest.fn();
    await renderWithTheme(
      <RubricBar items={items} activeKey="all" onSelect={onSelect} label="Filtrer" />,
    );

    await fireEvent.press(screen.getByRole('tab', { name: 'Lus' }));

    expect(onSelect).toHaveBeenCalledWith('lu');
  });
});
