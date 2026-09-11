import { useCallback, useEffect, useMemo, useRef, type RefObject } from 'react';
import type { FlatList } from 'react-native';

import { useSuppression } from './SuppressionProvider';
import type { LigneOuvrage } from '@/components/BookRow';

type Liste = Pick<FlatList<LigneOuvrage>, 'scrollToIndex'>;

function voisineDe(lignes: LigneOuvrage[], id: string | null): string | null {
  const index = id === null ? -1 : lignes.findIndex((ligne) => ligne.id === id);
  if (index === -1) {
    return null;
  }
  return (lignes[index + 1] ?? lignes[index - 1])?.id ?? null;
}

// Resolves the focus the deletion flow hands to the list, and names, while a row fades, the row
// that will stand next to its place. The first row stands in when the target is not in the list,
// so focus never falls on nothing.
export function useRefugeDeListe(
  lignes: LigneOuvrage[],
  enSortieId: string | null,
  liste: RefObject<Liste | null>,
) {
  const { refugeId, oublierRefuge, nommerVoisine } = useSuppression();
  const prisParUneLigne = useRef(false);

  const voisineId = useMemo(() => voisineDe(lignes, enSortieId), [lignes, enSortieId]);
  useEffect(() => {
    if (enSortieId !== null) {
      nommerVoisine(voisineId);
    }
  }, [enSortieId, voisineId, nommerVoisine]);

  const indexCible = refugeId === null ? -1 : lignes.findIndex((ligne) => ligne.id === refugeId);
  const index = indexCible !== -1 || lignes.length === 0 ? indexCible : 0;
  const focusId = refugeId === null ? null : (lignes[index]?.id ?? null);

  const surFocusPris = useCallback(() => {
    prisParUneLigne.current = true;
    oublierRefuge();
  }, [oublierRefuge]);

  // Rows run their effects first: when none took the focus, the row is not rendered yet.
  useEffect(() => {
    const pris = prisParUneLigne.current;
    prisParUneLigne.current = false;
    if (refugeId === null) {
      return;
    }
    if (index === -1) {
      oublierRefuge();
    } else if (!pris) {
      liste.current?.scrollToIndex({ index, animated: false, viewPosition: 0.5 });
    }
  }, [refugeId, index, liste, oublierRefuge]);

  return { focusId, surFocusPris };
}
