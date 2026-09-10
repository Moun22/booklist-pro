import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { StateMessage } from '@/components/StateMessage';

describe('StateMessage', () => {
  it('renders the title and the description', async () => {
    await renderWithTheme(
      <StateMessage icon="inbox" title="Aucun ouvrage" description="Ajoutez le premier ouvrage." />,
    );

    expect(screen.getByText('Aucun ouvrage')).toBeTruthy();
    expect(screen.getByText('Ajoutez le premier ouvrage.')).toBeTruthy();
  });

  it('announces an error and offers its recovery action', async () => {
    const onPress = jest.fn();
    await renderWithTheme(
      <StateMessage
        icon="alert-circle"
        tone="danger"
        title="Le fonds est indisponible"
        action={{ label: 'Réessayer', onPress }}
      />,
    );

    expect(screen.getByRole('alert')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Réessayer' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
