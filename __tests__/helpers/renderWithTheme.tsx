import { render } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { ThemeProvider } from '@/theme/ThemeProvider';

export function renderWithTheme(element: ReactElement) {
  return render(<ThemeProvider>{element}</ThemeProvider>);
}
