import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

type Props = {
  label: string;
  value: string;
  icon?: IconName;
  muted?: boolean;
};

export function FieldRow({ label, value, icon, muted = false }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.row, { borderBottomColor: colors.rule }]}>
      <AppText variant="rubric" tone="secondary" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.value}>
        <View style={styles.case}>{icon !== undefined && <Icon name={icon} tone="signal" />}</View>
        <AppText variant="body" tone={muted ? 'secondary' : 'ink'}>
          {value}
        </AppText>
      </View>
    </View>
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
  case: { width: layout.iconCase, alignItems: 'center' },
});
