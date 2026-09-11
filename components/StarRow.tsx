import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { StarIcon } from './StarIcon';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';
import { transitionEtat } from '@/theme/transitions';

type Props = {
  label: string;
  value: number | null;
  max: number;
  valueLabel: string;
  starLabel: (value: number) => string;
  removeLabel: string;
  onChange: (value: number | null) => void;
  busy?: boolean;
};

const LARGEUR_ETOILE = 32;
const HIT_SLOP = {
  left: (layout.touchTarget - LARGEUR_ETOILE) / 2,
  right: (layout.touchTarget - LARGEUR_ETOILE) / 2,
};

// Five stars in the value column of a field row; the lit star pressed again removes the rating.
export function StarRow({
  label,
  value,
  max,
  valueLabel,
  starLabel,
  removeLabel,
  onChange,
  busy = false,
}: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.row, { borderBottomColor: colors.rule }]}>
      <AppText variant="rubric" tone="secondary" style={styles.label}>
        {label}
      </AppText>
      <View style={styles.value}>
        <View role="radiogroup" aria-label={label} aria-busy={busy} style={styles.stars}>
          {Array.from({ length: max }, (_, index) => {
            const valeur = index + 1;
            const allumee = value !== null && valeur <= value;
            const courante = value === valeur;
            return (
              <Pressable
                key={valeur}
                role="radio"
                aria-checked={courante}
                aria-label={courante ? removeLabel : starLabel(valeur)}
                hitSlop={HIT_SLOP}
                onPress={() => onChange(courante ? null : valeur)}
                style={({ pressed }) => [styles.star, transitionEtat, pressed && styles.pressed]}
              >
                <StarIcon lit={allumee} />
              </Pressable>
            );
          })}
        </View>
        <AppText variant="body" tone={value === null ? 'secondary' : 'ink'}>
          {valueLabel}
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
    borderBottomWidth: hairline,
  },
  label: { width: layout.fieldLabel },
  value: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: space.sm },
  stars: { flexDirection: 'row', marginLeft: -((LARGEUR_ETOILE - layout.iconCase) / 2) },
  star: {
    width: LARGEUR_ETOILE,
    height: layout.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
});
