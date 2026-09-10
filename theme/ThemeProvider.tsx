import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { palette, type ColorScheme, type Colors } from './tokens';

export type Theme = {
  readonly scheme: ColorScheme;
  readonly colors: Colors;
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme: ColorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const theme = useMemo<Theme>(() => ({ scheme, colors: palette[scheme] }), [scheme]);

  useDocumentTheme(theme);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error('useTheme must be used inside a ThemeProvider.');
  }
  return theme;
}

// global.css reads these variables for the browser surfaces React Native cannot style:
// focus ring, text selection, caret, scrollbar and native form controls.
function useDocumentTheme({ scheme, colors }: Theme) {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }
    const root = document.documentElement.style;
    root.colorScheme = scheme;
    for (const [name, value] of Object.entries(colors)) {
      root.setProperty(`--bl-${name}`, value);
    }
  }, [scheme, colors]);
}
