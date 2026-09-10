import { afterEach, describe, expect, it, jest } from '@jest/globals';

import { ouvrageExemple, reponseJson, reponseVide } from '../helpers/fixtures';
import {
  listerOuvrages,
  remplacerOuvrage,
  retoucherOuvrage,
  supprimerOuvrage,
} from '@/services/api/ouvrages';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('services/api/ouvrages', () => {
  it('asks the server to filter, sort and paginate', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(
        reponseJson({ items: [ouvrageExemple], page: 2, limit: 20, total: 41, totalPages: 3 }),
      );

    const page = await listerOuvrages({
      page: 2,
      q: 'dune',
      favori: true,
      sort: 'annee',
      order: 'desc',
    });

    expect(page.total).toBe(41);
    expect(page.items[0]?.titre).toBe(ouvrageExemple.titre);
    expect(transport).toHaveBeenCalledWith(
      'http://localhost:3000/books?page=2&q=dune&favori=true&sort=annee&order=desc',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('replaces an ouvrage with If-Match and never sends a null cover', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson(ouvrageExemple));

    await remplacerOuvrage(ouvrageExemple.id, { ...ouvrageExemple, couverture: null }, 3);

    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}`,
      expect.objectContaining({
        method: 'PUT',
        headers: expect.objectContaining({ 'If-Match': '3' }),
        body: expect.not.stringContaining('couverture'),
      }),
    );
  });

  it('patches a single field without If-Match when no version is known', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson(ouvrageExemple));

    await retoucherOuvrage(ouvrageExemple.id, { favori: true });

    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}`,
      expect.objectContaining({ method: 'PATCH', body: '{"favori":true}' }),
    );
    const init = transport.mock.calls[0]?.[1];
    expect(init?.headers).not.toHaveProperty('If-Match');
  });

  it('deletes and resolves on an empty answer', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(reponseVide());

    await expect(supprimerOuvrage(ouvrageExemple.id)).resolves.toBeUndefined();
  });
});
