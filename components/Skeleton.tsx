import { StyleSheet, View, type DimensionValue } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';
import { radius } from '@/theme/tokens';

type Props = {
  width: DimensionValue;
  height: number;
  round?: boolean;
};

export function Skeleton({ width, height, round = false }: Props) {
  const { colors } = useTheme();
  return (
    <View
      aria-hidden
      style={[
        styles.block,
        { width, height, backgroundColor: colors.skeleton },
        round && { borderRadius: height / 2 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  block: { borderRadius: radius.sm },
});
