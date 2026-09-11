import { memo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { useAutoFocus } from '@/hooks/useAutoFocus';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, iconSize, layout, space } from '@/theme/tokens';
import { transitionEtat } from '@/theme/transitions';

export type LigneOuvrage = {
  id: string;
  titre: string;
  detail: string;
  note: string | null;
  lu: boolean;
  coupDeCoeur: boolean;
  description: string;
};

type Props = {
  ligne: LigneOuvrage;
  selectionnee: boolean;
  sortante?: boolean;
  autoFocus?: boolean;
  onAutoFocus?: () => void;
  onPress: (id: string) => void;
};

export const BookRow = memo(function BookRow({
  ligne,
  selectionnee,
  sortante = false,
  autoFocus = false,
  onAutoFocus,
  onPress,
}: Props) {
  const { colors } = useTheme();
  const [survolee, setSurvolee] = useState(false);
  const rangee = useAutoFocus<View>(autoFocus, onAutoFocus);
  const fond = selectionnee || survolee ? colors.surface : colors.page;

  return (
    <Pressable
      ref={rangee}
      role="button"
      aria-label={ligne.description}
      aria-selected={selectionnee}
      onPress={() => onPress(ligne.id)}
      onHoverIn={() => setSurvolee(true)}
      onHoverOut={() => setSurvolee(false)}
      style={({ pressed }) => [
        styles.row,
        transitionEtat,
        { backgroundColor: fond, borderBottomColor: colors.rule },
        pressed && styles.pressed,
        sortante && styles.sortante,
      ]}
    >
      <View style={styles.statut}>
        <View style={styles.marque}>{ligne.lu && <Icon name="check" tone="secondary" />}</View>
        <View style={styles.marque}>
          {ligne.coupDeCoeur && <Icon name="heart" tone="signal" />}
        </View>
      </View>
      <View style={styles.texte}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {ligne.titre}
        </AppText>
        <AppText variant="small" tone="secondary" numberOfLines={1}>
          {ligne.detail}
        </AppText>
      </View>
      <AppText
        variant="figure"
        tone={ligne.note === null ? 'secondary' : 'ink'}
        style={styles.note}
      >
        {ligne.note ?? '–'}
      </AppText>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: layout.rowHeight,
    paddingHorizontal: space.lg,
    gap: space.md,
    borderBottomWidth: hairline,
  },
  statut: { width: layout.statusColumn, flexDirection: 'row', gap: space.xs },
  marque: { width: iconSize, alignItems: 'center' },
  texte: { flex: 1, gap: 2 },
  note: { minWidth: 32, textAlign: 'right' },
  pressed: { opacity: 0.7 },
  sortante: { opacity: 0 },
});
