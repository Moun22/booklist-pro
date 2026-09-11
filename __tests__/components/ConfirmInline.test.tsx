import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { ConfirmInline } from '@/components/ConfirmInline';

describe('ConfirmInline', () => {
  it('shows the question with its two answers and reports each one', async () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    await renderWithTheme(
      <ConfirmInline
        message="Supprimer cet ouvrage du fonds ?"
        confirmLabel="Supprimer"
        cancelLabel="Garder"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    expect(screen.getByText('Supprimer cet ouvrage du fonds ?')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Garder' }));
    await fireEvent.press(screen.getByRole('button', { name: 'Supprimer' }));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
