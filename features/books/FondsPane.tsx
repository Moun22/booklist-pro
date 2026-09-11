import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { BandeauFonds } from './BandeauFonds';
import { FondsListe } from './FondsListe';
import { estRubrique, versRequeteFonds, type Rubrique } from './rubriques';
import { CLES_TRI, TRI_PAR_DEFAUT, choisirTri, estCleTri, type Tri } from './tri';
import { useFonds } from './useFonds';
import { Rule } from '@/components/Rule';
import { Skeleton } from '@/components/Skeleton';
import { SortMenu } from '@/components/SortMenu';
import { TallyLine } from '@/components/TallyLine';
import { useTraduction } from '@/features/i18n/useTraduction';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

const DELAI_RECHERCHE_MS = 300;

type Props = {
  selectionId: string | null;
  onOuvrir: (id: string) => void;
  onAjouter: () => void;
  detail?: ReactNode;
};

export function FondsPane({ selectionId, onOuvrir, onAjouter, detail }: Props) {
  const { colors } = useTheme();
  const t = useTraduction();
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

  const criteresTri = CLES_TRI.map((cle) => ({ key: cle, label: t.chrome.criteres[cle] }));
  const compte = fonds.chargementInitial
    ? null
    : [
        {
          figure: fonds.total.toLocaleString(t.locale),
          label: rechercheRetardee.trim().length > 0 ? t.chrome.resultats : t.chrome.ouvrages,
        },
        ...(fonds.actualisation ? [{ figure: '', label: t.chrome.actualisation }] : []),
      ];

  return (
    <View style={[styles.pane, { backgroundColor: colors.page }]}>
      <BandeauFonds
        large={large}
        rubrique={rubrique}
        onRubrique={choisirRubrique}
        recherche={recherche}
        onRecherche={setRecherche}
        onAjouter={onAjouter}
      />
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
            labels={t.chrome.tri}
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
