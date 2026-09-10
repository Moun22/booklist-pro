import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, radius, space } from '@/theme/tokens';
import { transitionEtat } from '@/theme/transitions';

type Props = {
  label: string;
  valueLabel: string;
  checked: boolean;
  onToggle: () => void;
  busy?: boolean;
};

export function ToggleRow({ label, valueLabel, checked, onToggle, busy = false }: Props) {
  const { colors } = useTheme();
  return (
    <Pressable
      role="switch"
      aria-checked={checked}
      aria-label={label}
      aria-busy={busy}
      onPress={onToggle}
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: colors.rule },
        pressed && styles.pressed,
      ]}
    >
      <AppText variant="rubric" tone="secondary" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.value}>
        <View
          style={[
            styles.box,
            transitionEtat,
            { borderColor: checked ? colors.ink : colors.inkSecondary },
          ]}
        >
          {checked && <Icon name="check" />}
        </View>
        <AppText variant="body">{valueLabel}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: layout.touchTarget,
    paddingVertical: space.sm,
    borderBottomWidth: hairline,
  },
  label: { width: layout.fieldLabel },
  value: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: space.sm },
  box: {
    width: layout.iconCase,
    height: layout.iconCase,
    borderRadius: radius.sm,
    borderWidth: hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
});
