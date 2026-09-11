import { afterEach, describe, expect, it } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { PreferencesProvider, usePreferences } from '@/features/preferences/PreferencesProvider';
import { useTheme } from '@/theme/ThemeProvider';

function Wrapper({ children }: { children: ReactNode }) {
  return <PreferencesProvider>{children}</PreferencesProvider>;
}

afterEach(async () => {
  await AsyncStorage.clear();
});

describe('PreferencesProvider', () => {
  it('starts in French on the system theme, switches at once and remembers the choice', async () => {
    const { result } = await renderHook(() => ({ ...usePreferences(), theme: useTheme() }), {
      wrapper: Wrapper,
    });

    expect(result.current.langue).toBe('fr');
    expect(result.current.dictionnaire.locale).toBe('fr-FR');

    await act(async () => {
      result.current.definirLangue('en');
      result.current.definirTheme('sombre');
    });

    expect(result.current.dictionnaire.locale).toBe('en-GB');
    expect(result.current.theme.scheme).toBe('dark');
    await waitFor(async () => {
      expect(await AsyncStorage.getItem('preferences.langue')).toBe('en');
      expect(await AsyncStorage.getItem('preferences.theme')).toBe('sombre');
    });
  });

  it('restores the stored preferences at the next start', async () => {
    await AsyncStorage.setItem('preferences.langue', 'en');
    await AsyncStorage.setItem('preferences.theme', 'clair');

    const { result } = await renderHook(() => ({ ...usePreferences(), theme: useTheme() }), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.langue).toBe('en'));
    expect(result.current.theme.scheme).toBe('light');
  });
});
