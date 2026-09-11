import Svg, { Path } from 'react-native-svg';

import { useTheme } from '@/theme/ThemeProvider';
import { iconSize } from '@/theme/tokens';

// Feather's own star outline, drawn here so a lit star can be filled without leaving the system.
const TRACE =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

type Props = {
  lit: boolean;
  size?: number;
};

export function StarIcon({ lit, size = iconSize }: Props) {
  const { colors } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <Path
        d={TRACE}
        fill={lit ? colors.ink : 'none'}
        stroke={lit ? colors.ink : colors.inkSecondary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
