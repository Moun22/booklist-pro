import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { ListSkeleton } from '@/components/ListSkeleton';
import { RubricBar, type Rubric } from '@/components/RubricBar';
import { Rule } from '@/components/Rule';
import { SearchField } from '@/components/SearchField';
import { Skeleton } from '@/components/Skeleton';
import { StateMessage } from '@/components/StateMessage';
import { SyncMark } from '@/components/SyncMark';
import { TextButton } from '@/components/TextButton';
import { useTheme } from '@/theme/ThemeProvider';
import { layout, space } from '@/theme/tokens';

const labels = {
  rubrics: 'Filtrer le fonds',
  search: 'Rechercher un titre ou un auteur',
  add: 'Ajouter un ouvrage',
  addShort: 'Ajouter',
  online: 'En ligne',
  loading: 'Chargement du fonds',
  detailTitle: 'Aucun ouvrage ouvert',
  detailHint: 'Choisissez un ouvrage dans le fonds pour lire sa fiche et ses notes de lecture.',
};

const rubrics: readonly Rubric[] = [
  { key: 'all', label: 'Fonds' },
  { key: 'lu', label: 'Lus' },
  { key: 'nonlu', label: 'Non lus' },
  { key: 'favori', label: 'Coups de coeur' },
];

const SKELETON_ROWS = 8;

export default function FondsScreen() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const twoPane = width >= layout.twoPaneMin;
  const [activeRubric, setActiveRubric] = useState<string>('all');
  const [query, setQuery] = useState('');

  const rubricBar = (
    <RubricBar
      items={rubrics}
      activeKey={activeRubric}
      onSelect={setActiveRubric}
      label={labels.rubrics}
    />
  );
  const search = (
    <SearchField value={query} onChangeText={setQuery} placeholder={labels.search} label={labels.search} />
  );
  const add = (
    <TextButton label={twoPane ? labels.add : labels.addShort} icon="plus" onPress={() => {}} />
  );
  const sync = <SyncMark status="online" label={labels.online} />;

  return (
    <View style={[styles.screen, { backgroundColor: colors.page }]}>
      <View style={{ backgroundColor: colors.surface }}>
        {twoPane ? (
          <View style={styles.chromeRow}>
            {rubricBar}
            <View style={styles.searchSlot}>{search}</View>
            {add}
            {sync}
          </View>
        ) : (
          <>
            <View style={styles.chromeRow}>
              <View style={styles.searchSlot}>{search}</View>
              {sync}
            </View>
            <View style={styles.chromeRow}>
              {rubricBar}
              <View style={styles.spacer} />
              {add}
            </View>
          </>
        )}
      </View>
      <Rule />
      <View style={styles.tally}>
        <Skeleton width={96} height={10} />
        <Skeleton width={64} height={10} />
        <Skeleton width={112} height={10} />
      </View>
      <Rule />
      <View style={styles.body}>
        <View style={styles.list}>
          <ListSkeleton rows={SKELETON_ROWS} label={labels.loading} />
        </View>
        {twoPane && (
          <>
            <Rule orientation="vertical" />
            <View style={styles.detail}>
              <StateMessage icon="book-open" title={labels.detailTitle} description={labels.detailHint} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  chromeRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: layout.chromeHeight,
    paddingHorizontal: space.sm,
  },
  searchSlot: { flex: 1, paddingHorizontal: space.sm },
  spacer: { flex: 1 },
  tally: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.lg,
    minHeight: layout.tallyHeight,
    paddingHorizontal: space.lg,
  },
  body: { flex: 1, flexDirection: 'row' },
  list: { flex: 1 },
  detail: { width: layout.detailPane, justifyContent: 'center' },
});
