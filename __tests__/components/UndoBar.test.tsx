import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { UndoBar } from '@/components/UndoBar';

const ESPACE_INSECABLE = String.fromCharCode(0xa0);

describe('UndoBar', () => {
  it('quotes the subject, states what happened and offers the undo action', async () => {
    const onAction = jest.fn();
    await renderWithTheme(
      <UndoBar
        subject="Dune"
        message="supprimé"
        actionLabel="Annuler"
        onAction={onAction}
        dureeMs={5000}
      />,
    );

    expect(screen.getByText(`«${ESPACE_INSECABLE}Dune`)).toBeTruthy();
    expect(screen.getByText(`${ESPACE_INSECABLE}» supprimé`)).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Annuler' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('shows a secondary action when one is given', async () => {
    const onSecondary = jest.fn();
    await renderWithTheme(
      <UndoBar
        tone="danger"
        subject="Dune"
        message="n'a pas pu être supprimé"
        actionLabel="Réessayer"
        onAction={() => {}}
        secondaryLabel="Fermer"
        onSecondary={onSecondary}
      />,
    );

    await fireEvent.press(screen.getByRole('button', { name: 'Fermer' }));

    expect(onSecondary).toHaveBeenCalledTimes(1);
  });
});
