import { StyleSheet, View } from 'react-native';

import { RUBRIQUES, type Rubrique } from './rubriques';
import { IconButton } from '@/components/IconButton';
import { RubricBar } from '@/components/RubricBar';
import { Rule } from '@/components/Rule';
import { SearchField } from '@/components/SearchField';
import { SyncMark } from '@/components/SyncMark';
import { TextButton } from '@/components/TextButton';
import { useTraduction } from '@/features/i18n/useTraduction';
import { usePreferences } from '@/features/preferences/PreferencesProvider';
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

// The chrome band: rubrics, search, the primary action, the sync state, then, behind a rule,
// the two preferences (theme, language) that a shop switches at opening and closing time.
// Under 960 px the rubrics keep a whole row to themselves, as the direction contract requires.
export function BandeauFonds({
  large,
  rubrique,
  onRubrique,
  recherche,
  onRecherche,
  onAjouter,
}: Props) {
  const { colors, scheme } = useTheme();
  const t = useTraduction();
  const { langue, definirTheme, definirLangue } = usePreferences();
  const sombre = scheme === 'dark';

  const rubriques = RUBRIQUES.map((cle) => ({ key: cle, label: t.chrome.rubriques[cle] }));
  const search = (
    <SearchField
      value={recherche}
      onChangeText={onRecherche}
      placeholder={large ? t.chrome.search : t.chrome.searchShort}
      label={t.chrome.search}
    />
  );
  const sync = <SyncMark status="online" label={t.chrome.online} />;
  const preferences = (
    <View style={styles.preferences}>
      <View style={styles.separateur}>
        <Rule orientation="vertical" />
      </View>
      <IconButton
        icon={sombre ? 'sun' : 'moon'}
        label={sombre ? t.theme.versClair : t.theme.versSombre}
        onPress={() => definirTheme(sombre ? 'clair' : 'sombre')}
      />
      <TextButton
        label={t.langue.autre}
        accessibilityLabel={t.langue.basculer}
        tone="ink"
        onPress={() => definirLangue(langue === 'fr' ? 'en' : 'fr')}
      />
    </View>
  );

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
          <TextButton label={t.chrome.add} icon="plus" onPress={onAjouter} />
          {sync}
          {preferences}
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.surface }}>
      <View style={styles.rangee}>
        <View style={styles.searchSlot}>{search}</View>
        <View style={styles.centre}>
          <IconButton icon="plus" label={t.chrome.add} tone="signal" onPress={onAjouter} />
        </View>
        {sync}
        {preferences}
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
  // The group stretches to the band's 48 px and centres its 44 px controls; only the rule is inset.
  preferences: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingLeft: space.sm,
  },
  separateur: { height: layout.chromeHeight - 2 * space.sm, flexDirection: 'row' },
});
