import { memo, useCallback, useMemo, useRef } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';

import type { Rubrique } from './rubriques';
import type { Fonds } from './useFonds';
import { useRefugeDeListe } from './useRefugeDeListe';
import { versLigne } from './versLigne';
import { BookRow, type LigneOuvrage } from '@/components/BookRow';
import { ListSkeleton } from '@/components/ListSkeleton';
import { StateMessage } from '@/components/StateMessage';
import { messagePourErreur } from '@/features/erreurs/messages';
import { layout } from '@/theme/tokens';

const labels = {
  chargement: 'Chargement du fonds',
  pageSuivante: 'Chargement de la page suivante',
  reessayer: 'Réessayer',
  effacerRecherche: 'Effacer la recherche',
  ajouter: 'Ajouter un ouvrage',
  vide: {
    tout: {
      titre: 'Le fonds est vide',
      detail: 'Ajoutez le premier ouvrage pour commencer le cahier.',
    },
    lus: { titre: 'Aucun ouvrage lu', detail: 'Marquez un ouvrage comme lu depuis sa fiche.' },
    nonLus: { titre: 'Tout le fonds est lu', detail: 'Rien à lire pour le moment.' },
    coupsDeCoeur: {
      titre: 'Aucun coup de coeur',
      detail: 'Le coeur sur une fiche signale un ouvrage à recommander.',
    },
  },
  aucunResultat: (recherche: string) => `Aucun ouvrage pour « ${recherche} »`,
  aucunResultatDetail: "Vérifiez l'orthographe, ou cherchez par auteur.",
};

const LIGNES_SQUELETTE = 8;
const LIGNES_PAGE_SUIVANTE = 2;

type Props = {
  fonds: Fonds;
  rubrique: Rubrique;
  recherche: string;
  selectionId: string | null;
  onSelection: (id: string) => void;
  onEffacerRecherche: () => void;
  onAjouter: () => void;
};

// Memoised so that typing in the search field, which re-renders the pane, never reaches the list.
export const FondsListe = memo(function FondsListe({
  fonds,
  rubrique,
  recherche,
  selectionId,
  onSelection,
  onEffacerRecherche,
  onAjouter,
}: Props) {
  const lignes = useMemo(() => fonds.ouvrages.map(versLigne), [fonds.ouvrages]);
  const { enSortieId } = fonds;
  const liste = useRef<FlatList<LigneOuvrage>>(null);
  const { focusId, surFocusPris } = useRefugeDeListe(lignes, enSortieId, liste);
  const etatLignes = useMemo(
    () => ({ selectionId, enSortieId, focusId }),
    [selectionId, enSortieId, focusId],
  );

  const rendreLigne = useCallback(
    ({ item }: ListRenderItemInfo<LigneOuvrage>) => (
      <BookRow
        ligne={item}
        selectionnee={item.id === selectionId}
        sortante={item.id === enSortieId}
        autoFocus={item.id === focusId}
        onAutoFocus={surFocusPris}
        onPress={onSelection}
      />
    ),
    [selectionId, enSortieId, focusId, surFocusPris, onSelection],
  );

  if (fonds.chargementInitial) {
    return <ListSkeleton rows={LIGNES_SQUELETTE} label={labels.chargement} />;
  }

  if (fonds.erreur !== null && lignes.length === 0) {
    const message = messagePourErreur(fonds.erreur);
    return (
      <StateMessage
        icon="alert-circle"
        tone="danger"
        title={message.titre}
        description={message.detail}
        action={{ label: labels.reessayer, icon: 'refresh-cw', onPress: fonds.reessayer }}
      />
    );
  }

  return (
    <FlatList
      ref={liste}
      data={lignes}
      extraData={etatLignes}
      keyExtractor={extraireCle}
      renderItem={rendreLigne}
      getItemLayout={disposition}
      initialNumToRender={20}
      onEndReached={fonds.chargerPageSuivante}
      onEndReachedThreshold={0.6}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <EtatVide
          rubrique={rubrique}
          recherche={recherche}
          onEffacerRecherche={onEffacerRecherche}
          onAjouter={onAjouter}
        />
      }
      ListFooterComponent={
        fonds.chargementPageSuivante ? (
          <ListSkeleton rows={LIGNES_PAGE_SUIVANTE} label={labels.pageSuivante} />
        ) : null
      }
    />
  );
});

function EtatVide({
  rubrique,
  recherche,
  onEffacerRecherche,
  onAjouter,
}: Pick<Props, 'rubrique' | 'recherche' | 'onEffacerRecherche' | 'onAjouter'>) {
  if (recherche.trim().length > 0) {
    return (
      <StateMessage
        icon="search"
        title={labels.aucunResultat(recherche.trim())}
        description={labels.aucunResultatDetail}
        action={{ label: labels.effacerRecherche, icon: 'x', onPress: onEffacerRecherche }}
      />
    );
  }
  const message = labels.vide[rubrique];
  return (
    <StateMessage
      icon="book-open"
      title={message.titre}
      description={message.detail}
      action={
        rubrique === 'tout'
          ? { label: labels.ajouter, icon: 'plus', onPress: onAjouter }
          : undefined
      }
    />
  );
}

function extraireCle(ligne: LigneOuvrage): string {
  return ligne.id;
}

function disposition(_: ArrayLike<LigneOuvrage> | null | undefined, index: number) {
  return { length: layout.rowHeight, offset: layout.rowHeight * index, index };
}
