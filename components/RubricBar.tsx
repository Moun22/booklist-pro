import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

export type Rubric = {
  key: string;
  label: string;
};

type Props = {
  items: readonly Rubric[];
  activeKey: string;
  onSelect: (key: string) => void;
  label: string;
};

export function RubricBar({ items, activeKey, onSelect, label }: Props) {
  const { colors } = useTheme();
  return (
    <View role="tablist" aria-label={label} style={styles.bar}>
      {items.map((item) => {
        const selected = item.key === activeKey;
        return (
          <Pressable
            key={item.key}
            role="tab"
            aria-selected={selected}
            onPress={() => onSelect(item.key)}
            style={({ pressed }) => [
              styles.tab,
              { borderBottomColor: selected ? colors.signal : 'transparent' },
              pressed && styles.pressed,
            ]}
          >
            <AppText variant="rubric" tone={selected ? 'signal' : 'secondary'}>
              {item.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'stretch' },
  tab: {
    minHeight: layout.touchTarget,
    minWidth: layout.touchTarget,
    paddingHorizontal: space.md,
    justifyContent: 'center',
    borderBottomWidth: hairline,
  },
  pressed: { opacity: 0.7 },
});
