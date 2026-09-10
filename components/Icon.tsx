import Feather from '@expo/vector-icons/Feather';
import type { ComponentProps } from 'react';

import { useTheme } from '@/theme/ThemeProvider';
import { toneColor, type Tone } from '@/theme/tone';
import { iconSize } from '@/theme/tokens';

export type IconName = ComponentProps<typeof Feather>['name'];

type Props = {
  name: IconName;
  tone?: Tone;
  size?: number;
  label?: string;
};

export function Icon({ name, tone = 'ink', size = iconSize, label }: Props) {
  const { colors } = useTheme();
  const decorative = label === undefined;
  return (
    <Feather
      name={name}
      size={size}
      color={toneColor(colors, tone)}
      aria-hidden={decorative}
      aria-label={label}
      role={decorative ? undefined : 'img'}
    />
  );
}
