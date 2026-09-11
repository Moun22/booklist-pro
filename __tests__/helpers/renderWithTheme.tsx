import { render } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { PreferencesProvider } from '@/features/preferences/PreferencesProvider';

export function renderWithTheme(element: ReactElement) {
  return render(<PreferencesProvider>{element}</PreferencesProvider>);
}
