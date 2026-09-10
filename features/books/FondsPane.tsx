import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { FondsListe } from './FondsListe';
import { RUBRIQUES, estRubrique, versRequeteFonds, type Rubrique } from './rubriques';
import { useFonds } from './useFonds';
import { RubricBar } from '@/components/RubricBar';
import { Rule } from '@/components/Rule';
import { SearchField } from '@/components/SearchField';
import { Skeleton } from '@/components/Skeleton';
import { SyncMark } from '@/components/SyncMark';
import { TallyLine } from '@/components/TallyLine';
import { TextButton } from '@/components/TextButton';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useTheme } from '@/theme/ThemeProvider';
import { layout, space } from '@/theme/tokens';

const labels = {
  rubrics: 'Filtrer le fonds',
  search: 'Rechercher un titre ou un auteur',
  searchShort: 'Titre ou auteur',
  add: 'Ajouter un ouvrage',
  addShort: 'Ajouter',
  online: 'En ligne',
  ouvrages: 'ouvrages',
  resultats: 'résultats',
  actualisation: 'actualisation',
};

const DELAI_RECHERCHE_MS = 300;

const rubriques = RUBRIQUES.map((rubrique) => ({ key: rubrique.cle, label: rubrique.libelle }));

type Props = {
  selectionId: string | null;
  onOuvrir: (id: string) => void;
  detail?: ReactNode;
};

export function FondsPane({ selectionId, onOuvrir, detail }: Props) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const large = width >= layout.twoPaneMin;

  const [rubrique, setRubrique] = useState<Rubrique>('tout');
  const [recherche, setRecherche] = useState('');
  const rechercheRetardee = useDebouncedValue(recherche, DELAI_RECHERCHE_MS);
  const requete = useMemo(
    () => versRequeteFonds(rubrique, rechercheRetardee),
    [rubrique, rechercheRetardee],
  );
  const fonds = useFonds(requete);

  const choisirRubrique = useCallback((cle: string) => {
    if (estRubrique(cle)) {
      setRubrique(cle);
    }
  }, []);
  const effacerRecherche = useCallback(() => setRecherche(''), []);
  const ajouter = useCallback(() => {}, []);

  const search = (
    <SearchField
      value={recherche}
      onChangeText={setRecherche}
      placeholder={large ? labels.search : labels.searchShort}
      label={labels.search}
    />
  );
  const sync = <SyncMark status="online" label={labels.online} />;

  const compte = fonds.chargementInitial
    ? null
    : [
        {
          figure: fonds.total.toLocaleString('fr-FR'),
          label: rechercheRetardee.trim().length > 0 ? labels.resultats : labels.ouvrages,
        },
        ...(fonds.actualisation ? [{ figure: '', label: labels.actualisation }] : []),
      ];

  return (
    <View style={[styles.pane, { backgroundColor: colors.page }]}>
      <View style={{ backgroundColor: colors.surface }}>
        {large ? (
          <View style={styles.chromeRow}>
            <RubricBar
              items={rubriques}
              activeKey={rubrique}
              onSelect={choisirRubrique}
              label={labels.rubrics}
            />
            <View style={styles.searchSlot}>{search}</View>
            <TextButton label={labels.add} icon="plus" onPress={ajouter} />
            {sync}
          </View>
        ) : (
          <>
            <View style={styles.chromeRow}>
              <View style={styles.searchSlot}>{search}</View>
              <TextButton label={labels.addShort} icon="plus" onPress={ajouter} />
              {sync}
            </View>
            <View style={styles.chromeRow}>
              <RubricBar
                items={rubriques}
                activeKey={rubrique}
                onSelect={choisirRubrique}
                label={labels.rubrics}
                defilable
              />
            </View>
          </>
        )}
      </View>
      <Rule />
      {compte === null ? (
        <View style={styles.tallySkeleton}>
          <Skeleton width={96} height={10} />
        </View>
      ) : (
        <TallyLine items={compte} />
      )}
      <Rule />
      <View style={styles.body}>
        <View style={styles.list}>
          <FondsListe
            fonds={fonds}
            rubrique={rubrique}
            recherche={rechercheRetardee}
            selectionId={selectionId}
            onSelection={onOuvrir}
            onEffacerRecherche={effacerRecherche}
            onAjouter={ajouter}
          />
        </View>
        {detail !== undefined && (
          <>
            <Rule orientation="vertical" />
            <View style={styles.detail}>{detail}</View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pane: { flex: 1 },
  chromeRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: layout.chromeHeight,
    paddingHorizontal: space.sm,
  },
  searchSlot: { flex: 1, paddingHorizontal: space.sm },
  tallySkeleton: {
    justifyContent: 'center',
    minHeight: layout.tallyHeight,
    paddingHorizontal: space.lg,
  },
  body: { flex: 1, flexDirection: 'row' },
  list: { flex: 1 },
  detail: { width: layout.detailPane },
});
