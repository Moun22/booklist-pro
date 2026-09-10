import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';
import { transitionEtat } from '@/theme/transitions';

export type Rubric = {
  key: string;
  label: string;
};

type Props = {
  items: readonly Rubric[];
  activeKey: string;
  onSelect: (key: string) => void;
  label: string;
  defilable?: boolean;
};

export function RubricBar({ items, activeKey, onSelect, label, defilable = false }: Props) {
  const { colors } = useTheme();
  const onglets = items.map((item) => {
    const selected = item.key === activeKey;
    return (
      <Pressable
        key={item.key}
        role="tab"
        aria-selected={selected}
        onPress={() => onSelect(item.key)}
        style={({ pressed }) => [
          styles.tab,
          transitionEtat,
          { borderBottomColor: selected ? colors.signal : 'transparent' },
          pressed && styles.pressed,
        ]}
      >
        <AppText variant="rubric" tone={selected ? 'signal' : 'secondary'}>
          {item.label}
        </AppText>
      </Pressable>
    );
  });

  if (defilable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        role="tablist"
        aria-label={label}
        style={styles.defilement}
        contentContainerStyle={styles.bar}
      >
        {onglets}
      </ScrollView>
    );
  }

  return (
    <View role="tablist" aria-label={label} style={styles.bar}>
      {onglets}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'stretch' },
  defilement: { flex: 1 },
  tab: {
    minHeight: layout.touchTarget,
    minWidth: layout.touchTarget,
    paddingHorizontal: space.md,
    justifyContent: 'center',
    borderBottomWidth: hairline,
  },
  pressed: { opacity: 0.7 },
});
