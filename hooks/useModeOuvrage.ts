import { useWindowDimensions } from 'react-native';

import { layout } from '@/theme/tokens';

export function useModeOuvrage(): 'ecran' | 'volet' {
  const { width } = useWindowDimensions();
  return width >= layout.twoPaneMin ? 'volet' : 'ecran';
}
