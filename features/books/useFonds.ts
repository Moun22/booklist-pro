import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { clesOuvrages } from './cles';
import { useSuppression } from './SuppressionProvider';
import type { Ouvrage } from '@/domain/ouvrage';
import { listerOuvrages, type RequeteFonds } from '@/services/api/ouvrages';

const TAILLE_PAGE = 20;

export type Fonds = {
  ouvrages: Ouvrage[];
  total: number;
  enSortieId: string | null;
  chargementInitial: boolean;
  chargementPageSuivante: boolean;
  actualisation: boolean;
  erreur: unknown;
  aPageSuivante: boolean;
  chargerPageSuivante: () => void;
  reessayer: () => void;
};

export function useFonds(requete: RequeteFonds): Fonds {
  const resultat = useInfiniteQuery({
    queryKey: clesOuvrages.liste(requete),
    queryFn: ({ pageParam, signal }) =>
      listerOuvrages({ ...requete, page: pageParam, limit: TAILLE_PAGE }, signal),
    initialPageParam: 1,
    getNextPageParam: (derniere) =>
      derniere.page < derniere.totalPages ? derniere.page + 1 : undefined,
    placeholderData: keepPreviousData,
  });

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = resultat;
  const { enAttente } = useSuppression();
  const tous = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);
  // An ouvrage whose deletion is still undoable never shows, even in a list fetched meanwhile.
  const ouvrages = useMemo(
    () =>
      enAttente?.retiree ? tous.filter((ouvrage) => ouvrage.id !== enAttente.ouvrage.id) : tous,
    [tous, enAttente],
  );
  const totalServeur = data?.pages[0]?.total ?? 0;
  const masque = ouvrages.length < tous.length;

  return {
    ouvrages,
    total: masque ? Math.max(0, totalServeur - 1) : totalServeur,
    enSortieId: enAttente !== null && !enAttente.retiree ? enAttente.ouvrage.id : null,
    chargementInitial: resultat.isPending,
    chargementPageSuivante: isFetchingNextPage,
    actualisation: resultat.isFetching && !isFetchingNextPage && !resultat.isPending,
    erreur: resultat.isError ? resultat.error : null,
    aPageSuivante: hasNextPage,
    chargerPageSuivante: () => {
      if (hasNextPage && !isFetchingNextPage) {
        void fetchNextPage();
      }
    },
    reessayer: () => {
      void refetch();
    },
  };
}
