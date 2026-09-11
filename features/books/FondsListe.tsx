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
import type { Dictionnaire } from '@/features/i18n/fr';
import { useTraduction } from '@/features/i18n/useTraduction';
import { layout } from '@/theme/tokens';

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
  const t = useTraduction();
  const lignes = useMemo(
    () => fonds.ouvrages.map((ouvrage) => versLigne(ouvrage, t.ligne)),
    [fonds.ouvrages, t],
  );
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
    return <ListSkeleton rows={LIGNES_SQUELETTE} label={t.liste.chargement} />;
  }

  if (fonds.erreur !== null && lignes.length === 0) {
    const message = messagePourErreur(fonds.erreur, t.erreurs);
    return (
      <StateMessage
        icon="alert-circle"
        tone="danger"
        title={message.titre}
        description={message.detail}
        action={{ label: t.liste.reessayer, icon: 'refresh-cw', onPress: fonds.reessayer }}
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
          t={t.liste}
          rubrique={rubrique}
          recherche={recherche}
          onEffacerRecherche={onEffacerRecherche}
          onAjouter={onAjouter}
        />
      }
      ListFooterComponent={
        fonds.chargementPageSuivante ? (
          <ListSkeleton rows={LIGNES_PAGE_SUIVANTE} label={t.liste.pageSuivante} />
        ) : null
      }
    />
  );
});

type EtatVideProps = Pick<Props, 'rubrique' | 'recherche' | 'onEffacerRecherche' | 'onAjouter'> & {
  t: Dictionnaire['liste'];
};

function EtatVide({ t, rubrique, recherche, onEffacerRecherche, onAjouter }: EtatVideProps) {
  if (recherche.trim().length > 0) {
    return (
      <StateMessage
        icon="search"
        title={t.aucunResultat(recherche.trim())}
        description={t.aucunResultatDetail}
        action={{ label: t.effacerRecherche, icon: 'x', onPress: onEffacerRecherche }}
      />
    );
  }
  const message = t.vide[rubrique];
  return (
    <StateMessage
      icon="book-open"
      title={message.titre}
      description={message.detail}
      action={
        rubrique === 'tout' ? { label: t.ajouter, icon: 'plus', onPress: onAjouter } : undefined
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
