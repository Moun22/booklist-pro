import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { clesOuvrages } from './cles';
import type { Ouvrage } from '@/domain/ouvrage';
import { listerOuvrages, type RequeteFonds } from '@/services/api/ouvrages';

const TAILLE_PAGE = 20;

export type Fonds = {
  ouvrages: Ouvrage[];
  total: number;
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
  const ouvrages = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  return {
    ouvrages,
    total: data?.pages[0]?.total ?? 0,
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
