import { describe, expect, it } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import { renderWithTheme } from '../helpers/renderWithTheme';
import { CoverImage } from '@/components/CoverImage';

describe('CoverImage', () => {
  it('shows a labelled stand-in when there is no cover', async () => {
    await renderWithTheme(
      <CoverImage source={{ repli: true }} label="Sans couverture" width={28} height={40} />,
    );

    expect(screen.getByLabelText('Sans couverture')).toBeTruthy();
    expect(screen.queryByLabelText('Sans couverture')?.props.role).toBe('img');
  });

  it('labels the picture with the title of the ouvrage', async () => {
    await renderWithTheme(
      <CoverImage
        source={{ uri: 'http://localhost:3000/covers/abc.svg' }}
        label="Couverture de Dune"
        width={80}
        height={120}
      />,
    );

    expect(screen.getByLabelText('Couverture de Dune')).toBeTruthy();
  });
});
