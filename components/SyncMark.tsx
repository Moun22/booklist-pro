import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '@/theme/ThemeProvider';
import type { Tone } from '@/theme/tone';
import { hairline, space } from '@/theme/tokens';

export type SyncStatus = 'online' | 'offline' | 'pending' | 'conflict';

type Props = {
  status: SyncStatus;
  label: string;
};

const TONE: Record<SyncStatus, Tone> = {
  online: 'signal',
  offline: 'secondary',
  pending: 'ink',
  conflict: 'danger',
};

export function SyncMark({ status, label }: Props) {
  const { colors } = useTheme();
  const dot = {
    online: { backgroundColor: colors.signal },
    offline: { borderWidth: hairline, borderColor: colors.inkSecondary },
    pending: { borderWidth: hairline, borderColor: colors.ink },
    conflict: { backgroundColor: colors.danger },
  }[status];

  return (
    <View role="status" aria-live="polite" style={styles.mark}>
      <View aria-hidden style={[styles.dot, dot]} />
      <AppText variant="rubric" tone={TONE[status]}>
        {label}
      </AppText>
    </View>
  );
}

const DOT = 8;

const styles = StyleSheet.create({
  mark: { flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingHorizontal: space.md },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2 },
});
