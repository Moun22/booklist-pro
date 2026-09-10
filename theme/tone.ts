import type { Colors } from './tokens';

export type Tone = 'ink' | 'secondary' | 'signal' | 'danger';

export function toneColor(colors: Colors, tone: Tone): string {
  switch (tone) {
    case 'ink':
      return colors.ink;
    case 'secondary':
      return colors.inkSecondary;
    case 'signal':
      return colors.signal;
    case 'danger':
      return colors.danger;
  }
}
