import { StyleSheet, View } from 'react-native';

import { Rule } from './Rule';
import { Skeleton } from './Skeleton';
import { iconSize, layout, space } from '@/theme/tokens';

type Props = {
  rows: number;
  label: string;
};

export function ListSkeleton({ rows, label }: Props) {
  return (
    <View role="progressbar" aria-label={label} aria-busy>
      {Array.from({ length: rows }, (_, index) => (
        <View key={index}>
          <View style={styles.row}>
            <View style={styles.status}>
              <Skeleton width={iconSize} height={iconSize} round />
            </View>
            <View style={styles.text}>
              <Skeleton width="45%" height={12} />
              <Skeleton width="65%" height={10} />
            </View>
            <Skeleton width={32} height={10} />
          </View>
          <Rule />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: layout.rowHeight,
    paddingHorizontal: space.lg,
    gap: space.md,
  },
  status: { width: layout.statusColumn, alignItems: 'center' },
  text: { flex: 1, gap: space.sm },
});
