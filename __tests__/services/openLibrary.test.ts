import { afterEach, describe, expect, it, jest } from '@jest/globals';

import { reponseJson } from '../helpers/fixtures';
import { rechercherEditions } from '@/services/api/openLibrary';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('services/api/openLibrary', () => {
  it('asks OpenLibrary for the title and reads the first match', async () => {
    const transport = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      reponseJson({
        numFound: 3,
        docs: [{ edition_count: 12, first_publish_year: 1965 }],
      }),
    );

    const editions = await rechercherEditions('Dune');

    expect(editions).toEqual({ editions: 12, premiereAnnee: 1965 });
    expect(transport).toHaveBeenCalledWith(
      'https://openlibrary.org/search.json?title=Dune&limit=1&fields=edition_count%2Cfirst_publish_year',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('treats zero edition as an ordinary answer', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson({ numFound: 0, docs: [] }));

    await expect(rechercherEditions('Titre saisi à la va-vite')).resolves.toEqual({
      editions: 0,
      premiereAnnee: null,
    });
  });

  it('rejects an answer that is not the expected shape', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseJson({ resultats: [] }));

    await expect(rechercherEditions('Dune')).rejects.toMatchObject({ cause: 'reponse-invalide' });
  });
});
