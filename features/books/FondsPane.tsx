import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { FondsListe } from './FondsListe';
import { RUBRIQUES, estRubrique, versRequeteFonds, type Rubrique } from './rubriques';
import { CLES_TRI, TRI_PAR_DEFAUT, choisirTri, estCleTri, type Tri } from './tri';
import { useFonds } from './useFonds';
import { RubricBar } from '@/components/RubricBar';
import { Rule } from '@/components/Rule';
import { SearchField } from '@/components/SearchField';
import { Skeleton } from '@/components/Skeleton';
import { SortMenu } from '@/components/SortMenu';
import { SyncMark } from '@/components/SyncMark';
import { TallyLine } from '@/components/TallyLine';
import { TextButton } from '@/components/TextButton';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

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
  tri: {
    group: 'Trier le fonds',
    prefix: 'Tri :',
    asc: 'croissant',
    desc: 'décroissant',
    hint: 'Choisir à nouveau le même critère inverse l’ordre.',
  },
};

const DELAI_RECHERCHE_MS = 300;

const rubriques = RUBRIQUES.map((rubrique) => ({ key: rubrique.cle, label: rubrique.libelle }));
const criteresTri = CLES_TRI.map((entree) => ({ key: entree.cle, label: entree.libelle }));

type Props = {
  selectionId: string | null;
  onOuvrir: (id: string) => void;
  onAjouter: () => void;
  detail?: ReactNode;
};

export function FondsPane({ selectionId, onOuvrir, onAjouter, detail }: Props) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const large = width >= layout.twoPaneMin;

  const [rubrique, setRubrique] = useState<Rubrique>('tout');
  const [recherche, setRecherche] = useState('');
  const [tri, setTri] = useState<Tri>(TRI_PAR_DEFAUT);
  const [menuTriOuvert, setMenuTriOuvert] = useState(false);
  const rechercheRetardee = useDebouncedValue(recherche, DELAI_RECHERCHE_MS);
  const requete = useMemo(
    () => versRequeteFonds(rubrique, rechercheRetardee, tri),
    [rubrique, rechercheRetardee, tri],
  );
  const fonds = useFonds(requete);

  const choisirRubrique = useCallback((cle: string) => {
    if (estRubrique(cle)) {
      setRubrique(cle);
    }
  }, []);
  const effacerRecherche = useCallback(() => setRecherche(''), []);
  const ouvrirMenuTri = useCallback(() => setMenuTriOuvert(true), []);
  const fermerMenuTri = useCallback(() => setMenuTriOuvert(false), []);
  const choisirCritere = useCallback((cle: string) => {
    if (estCleTri(cle)) {
      setTri((courant) => choisirTri(courant, cle));
    }
    setMenuTriOuvert(false);
  }, []);

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
            <TextButton label={labels.add} icon="plus" onPress={onAjouter} />
            {sync}
          </View>
        ) : (
          <>
            <View style={styles.chromeRow}>
              <View style={styles.searchSlot}>{search}</View>
              <TextButton label={labels.addShort} icon="plus" onPress={onAjouter} />
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
      {/* The tally line follows the body columns: the sort control belongs to the list it sorts. */}
      <View style={styles.tallyRow}>
        <View style={styles.tallyColumn}>
          <View style={styles.tallySlot}>
            {compte === null ? (
              <View style={styles.tallySkeleton}>
                <Skeleton width={96} height={10} />
              </View>
            ) : (
              <TallyLine items={compte} />
            )}
          </View>
          <SortMenu
            options={criteresTri}
            activeKey={tri.cle}
            direction={tri.sens}
            open={menuTriOuvert}
            onOpen={ouvrirMenuTri}
            onClose={fermerMenuTri}
            onSelect={choisirCritere}
            labels={labels.tri}
          />
        </View>
        {detail !== undefined && <View style={styles.detailSpacer} />}
      </View>
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
            onAjouter={onAjouter}
          />
        </View>
        {detail !== undefined && (
          <>
            <Rule orientation="vertical" />
            <View style={styles.detail}>{detail}</View>
          </>
        )}
      </View>
      {menuTriOuvert && (
        <Pressable aria-hidden focusable={false} onPress={fermerMenuTri} style={styles.voile} />
      )}
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
  tallyRow: { flexDirection: 'row', zIndex: 2 },
  tallyColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: space.lg,
  },
  tallySlot: { flex: 1 },
  detailSpacer: { width: layout.detailPane + hairline },
  tallySkeleton: {
    justifyContent: 'center',
    minHeight: layout.tallyHeight,
    paddingHorizontal: space.lg,
  },
  body: { flex: 1, flexDirection: 'row' },
  list: { flex: 1 },
  detail: { width: layout.detailPane },
  voile: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 },
});
