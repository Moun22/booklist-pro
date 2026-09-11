import { StyleSheet, View } from 'react-native';

import { RUBRIQUES, type Rubrique } from './rubriques';
import { IconButton } from '@/components/IconButton';
import { RubricBar } from '@/components/RubricBar';
import { SearchField } from '@/components/SearchField';
import { TextButton } from '@/components/TextButton';
import { useSession } from '@/features/auth/SessionProvider';
import { useTraduction } from '@/features/i18n/useTraduction';
import { ControlesPreferences } from '@/features/preferences/ControlesPreferences';
import { MarqueServeur } from '@/features/sync/MarqueServeur';
import { useTheme } from '@/theme/ThemeProvider';
import { layout, space } from '@/theme/tokens';

type Props = {
  large: boolean;
  rubrique: Rubrique;
  onRubrique: (cle: string) => void;
  recherche: string;
  onRecherche: (texte: string) => void;
  onAjouter: () => void;
};

// The chrome band: rubrics, search, the primary action (hidden from a read-only account), the
// sync state, then the preferences. Under 960 px the rubrics keep a whole row to themselves.
export function BandeauFonds({
  large,
  rubrique,
  onRubrique,
  recherche,
  onRecherche,
  onAjouter,
}: Props) {
  const { colors } = useTheme();
  const t = useTraduction();
  const { peutEcrire } = useSession();

  const rubriques = RUBRIQUES.map((cle) => ({ key: cle, label: t.chrome.rubriques[cle] }));
  const search = (
    <SearchField
      value={recherche}
      onChangeText={onRecherche}
      placeholder={large ? t.chrome.search : t.chrome.searchShort}
      label={t.chrome.search}
    />
  );
  const sync = <MarqueServeur />;

  if (large) {
    return (
      <View style={{ backgroundColor: colors.surface }}>
        <View style={styles.rangee}>
          <RubricBar
            items={rubriques}
            activeKey={rubrique}
            onSelect={onRubrique}
            label={t.chrome.rubrics}
          />
          <View style={styles.searchSlot}>{search}</View>
          {peutEcrire && <TextButton label={t.chrome.add} icon="plus" onPress={onAjouter} />}
          {sync}
          <ControlesPreferences />
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.surface }}>
      <View style={styles.rangee}>
        <View style={styles.searchSlot}>{search}</View>
        {peutEcrire && (
          <View style={styles.centre}>
            <IconButton icon="plus" label={t.chrome.add} tone="signal" onPress={onAjouter} />
          </View>
        )}
        {sync}
        <ControlesPreferences compact />
      </View>
      <View style={styles.rangee}>
        <RubricBar
          items={rubriques}
          activeKey={rubrique}
          onSelect={onRubrique}
          label={t.chrome.rubrics}
          defilable
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rangee: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: layout.chromeHeight,
    paddingHorizontal: space.sm,
  },
  searchSlot: { flex: 1, paddingHorizontal: space.sm },
  centre: { justifyContent: 'center' },
});
