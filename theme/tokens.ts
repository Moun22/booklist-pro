import { Platform } from 'react-native';

export type ColorScheme = 'light' | 'dark';

export type ColorName =
  | 'page'
  | 'surface'
  | 'ink'
  | 'inkSecondary'
  | 'rule'
  | 'signal'
  | 'onSignal'
  | 'danger'
  | 'skeleton';

export type Colors = Readonly<Record<ColorName, string>>;

export const palette: Readonly<Record<ColorScheme, Colors>> = {
  light: {
    page: '#FFFFFF',
    surface: '#F4F4F2',
    ink: '#1C1C1C',
    inkSecondary: '#6F6F6F',
    rule: '#E3E3E0',
    signal: '#1F5C3A',
    onSignal: '#FFFFFF',
    danger: '#B3261E',
    skeleton: '#ECECEA',
  },
  dark: {
    page: '#141414',
    surface: '#1E1E1D',
    ink: '#EDEDEA',
    inkSecondary: '#A0A09B',
    rule: '#2C2C2A',
    signal: '#6FBF8E',
    onSignal: '#141414',
    danger: '#F28B82',
    skeleton: '#242423',
  },
};

export const fontFamily = Platform.select({
  web: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  default: undefined,
});

export const fontSize = { rubric: 11, small: 13, body: 14, lead: 16, title: 20 } as const;
export const lineHeight = { rubric: 16, small: 18, body: 20, lead: 22, title: 26 } as const;
export const rubricTracking = 0.88;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 2 } as const;
export const hairline = 1;
export const iconSize = 16;

export const layout = {
  chromeHeight: 48,
  tallyHeight: 28,
  rowHeight: 56,
  statusColumn: 28,
  detailPane: 400,
  twoPaneMin: 960,
  touchTarget: 44,
} as const;

export const motion = { quick: 150 } as const;
