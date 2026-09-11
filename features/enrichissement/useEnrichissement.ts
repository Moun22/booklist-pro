import { useQuery } from '@tanstack/react-query';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { rechercherEditions, type Editions } from '@/services/api/openLibrary';

export type Enrichissement = {
  etat: 'inactif' | 'recherche' | 'trouve' | 'aucune' | 'indisponible';
  editions: number;
  premiereAnnee: number | null;
};

const DELAI_MS = 300;
const UN_JOUR_MS = 24 * 60 * 60 * 1000;

// A title flipped through quickly never reaches OpenLibrary, an answer is kept for the session,
// and OpenLibrary being down is just one more state of this row: the fiche never depends on it.
export function useEnrichissement(titre: string): Enrichissement {
  const titreRetarde = useDebouncedValue(titre.trim(), DELAI_MS);
  const requete = useQuery<Editions>({
    queryKey: ['openlibrary', titreRetarde],
    queryFn: ({ signal }) => rechercherEditions(titreRetarde, signal),
    enabled: titreRetarde.length > 0,
    staleTime: Infinity,
    gcTime: UN_JOUR_MS,
    retry: false,
  });

  if (titreRetarde.length === 0) {
    return { etat: 'inactif', editions: 0, premiereAnnee: null };
  }
  if (requete.isError) {
    return { etat: 'indisponible', editions: 0, premiereAnnee: null };
  }
  if (requete.data === undefined) {
    return { etat: 'recherche', editions: 0, premiereAnnee: null };
  }
  return {
    etat: requete.data.editions === 0 ? 'aucune' : 'trouve',
    editions: requete.data.editions,
    premiereAnnee: requete.data.premiereAnnee,
  };
}
