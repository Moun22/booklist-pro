import { describe, expect, it } from '@jest/globals';

import { ouvrageExemple } from '../helpers/fixtures';
import { retirerDesListes, type DonneesListe } from '@/features/books/cacheOuvrages';

const autre = { ...ouvrageExemple, id: 'autre', titre: 'Autre' };

const donnees: DonneesListe = {
  pageParams: [1, 2],
  pages: [
    { items: [autre], page: 1, limit: 1, total: 2, totalPages: 2 },
    { items: [ouvrageExemple], page: 2, limit: 1, total: 2, totalPages: 2 },
  ],
};

describe('retirerDesListes', () => {
  it('drops the ouvrage from its page and lowers the total on every page', () => {
    const resultat = retirerDesListes(donnees, ouvrageExemple.id);

    expect(resultat.pages[1]?.items).toEqual([]);
    expect(resultat.pages[0]?.items).toEqual([autre]);
    expect(resultat.pages.map((page) => page.total)).toEqual([1, 1]);
  });

  it('returns the same data when the ouvrage is not in the list', () => {
    expect(retirerDesListes(donnees, 'inconnu')).toBe(donnees);
  });
});
