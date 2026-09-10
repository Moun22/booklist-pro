import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { TextButton } from './TextButton';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

type Props = {
  mode: 'ecran' | 'volet';
  backLabel: string;
  closeLabel: string;
  onClose: () => void;
  trailing?: ReactNode;
};

export function ScreenHeader({ mode, backLabel, closeLabel, onClose, trailing }: Props) {
  const { colors } = useTheme();
  if (mode === 'ecran') {
    return (
      <View style={[styles.header, styles.bande, { backgroundColor: colors.surface }]}>
        <TextButton label={backLabel} icon="chevron-left" tone="ink" onPress={onClose} />
        <View style={styles.spacer} />
        {trailing}
      </View>
    );
  }
  // The volet header is one list row tall and carries its own rule, so the two rules meet at the same y.
  return (
    <View style={[styles.header, styles.volet, { borderBottomColor: colors.rule }]}>
      <View style={styles.spacer} />
      {trailing}
      <TextButton label={closeLabel} icon="x" tone="ink" onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.sm,
  },
  bande: { minHeight: layout.chromeHeight },
  volet: { height: layout.rowHeight, borderBottomWidth: hairline },
  spacer: { flex: 1 },
});
