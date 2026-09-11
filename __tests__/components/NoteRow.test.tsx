import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { NoteRow } from '@/components/NoteRow';

function rendre(onDelete: () => void) {
  return renderWithTheme(
    <NoteRow
      timestamp="12 sept. 2026, 16:32"
      content="À conseiller aux lecteurs de Le Guin."
      deleteLabel="Supprimer la note du 12 sept. 2026, 16:32"
      question="Supprimer cette note ?"
      confirmLabel="Supprimer"
      cancelLabel="Garder"
      onDelete={onDelete}
    />,
  );
}

describe('NoteRow', () => {
  it('shows the timestamp and the content', async () => {
    await rendre(() => {});

    expect(screen.getByText('12 sept. 2026, 16:32')).toBeTruthy();
    expect(screen.getByText('À conseiller aux lecteurs de Le Guin.')).toBeTruthy();
  });

  it('asks in place before deleting and reports the confirmation only', async () => {
    const onDelete = jest.fn();
    await rendre(onDelete);

    await fireEvent.press(
      screen.getByRole('button', { name: 'Supprimer la note du 12 sept. 2026, 16:32' }),
    );
    expect(screen.getByText('Supprimer cette note ?')).toBeTruthy();

    await fireEvent.press(screen.getByRole('button', { name: 'Garder' }));
    expect(screen.queryByText('Supprimer cette note ?')).toBeNull();
    expect(onDelete).not.toHaveBeenCalled();

    await fireEvent.press(
      screen.getByRole('button', { name: 'Supprimer la note du 12 sept. 2026, 16:32' }),
    );
    await fireEvent.press(screen.getByRole('button', { name: 'Supprimer' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
