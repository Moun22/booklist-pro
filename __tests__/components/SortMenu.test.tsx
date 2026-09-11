import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { SortMenu } from '@/components/SortMenu';

const options = [
  { key: 'titre', label: 'Titre' },
  { key: 'note', label: 'Note' },
];
const labels = {
  group: 'Trier',
  prefix: 'Tri :',
  asc: 'croissant',
  desc: 'décroissant',
  hint: 'Choisir à nouveau inverse.',
};

describe('SortMenu', () => {
  it('names the current order on its trigger and opens on press', async () => {
    const onOpen = jest.fn();
    await renderWithTheme(
      <SortMenu
        options={options}
        activeKey="note"
        direction="desc"
        open={false}
        onOpen={onOpen}
        onClose={() => {}}
        onSelect={() => {}}
        labels={labels}
      />,
    );

    expect(screen.queryByRole('radio')).toBeNull();
    await fireEvent.press(screen.getByRole('button', { name: 'Tri : Note, décroissant' }));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('lists the criteria as radios and reports the chosen one', async () => {
    const onSelect = jest.fn();
    await renderWithTheme(
      <SortMenu
        options={options}
        activeKey="titre"
        direction="asc"
        open
        onOpen={() => {}}
        onClose={() => {}}
        onSelect={onSelect}
        labels={labels}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Titre, croissant', checked: true })).toBeTruthy();
    await fireEvent.press(screen.getByRole('radio', { name: 'Note', checked: false }));

    expect(onSelect).toHaveBeenCalledWith('note');
  });
});
