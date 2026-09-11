import { z } from 'zod';

import { creerClientHttp } from './client';

const OPEN_LIBRARY_URL = 'https://openlibrary.org';
const DELAI_MS = 5000;

const clientOpenLibrary = creerClientHttp({ baseUrl: OPEN_LIBRARY_URL, delaiMs: DELAI_MS });

const rechercheSchema = z.object({
  numFound: z.number().int().nonnegative(),
  docs: z.array(
    z.object({
      edition_count: z.number().int().nonnegative().optional(),
      first_publish_year: z.number().int().optional(),
    }),
  ),
});

export type Editions = {
  editions: number;
  premiereAnnee: number | null;
};

// Zero edition is an ordinary answer for a title typed in a hurry, not a failure.
export async function rechercherEditions(titre: string, signal?: AbortSignal): Promise<Editions> {
  const parametres = new URLSearchParams({
    title: titre,
    limit: '1',
    fields: 'edition_count,first_publish_year',
  });
  const resultat = await clientOpenLibrary.requeter(
    { chemin: `/search.json?${parametres.toString()}`, signal },
    rechercheSchema,
  );
  const premier = resultat.docs[0];
  if (resultat.numFound === 0 || premier === undefined) {
    return { editions: 0, premiereAnnee: null };
  }
  return {
    editions: premier.edition_count ?? resultat.numFound,
    premiereAnnee: premier.first_publish_year ?? null,
  };
}
