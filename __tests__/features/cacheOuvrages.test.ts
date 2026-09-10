import { describe, expect, it } from '@jest/globals';
import { QueryClient } from '@tanstack/react-query';

import { ouvrageExemple } from '../helpers/fixtures';
import {
  remplacerDansListe,
  trouverDansListes,
  type DonneesListe,
} from '@/features/books/cacheOuvrages';
import { clesOuvrages } from '@/features/books/cles';

const autre = { ...ouvrageExemple, id: 'autre', titre: 'Autre' };

const donnees: DonneesListe = {
  pageParams: [1, 2],
  pages: [
    { items: [autre], page: 1, limit: 1, total: 2, totalPages: 2 },
    { items: [ouvrageExemple], page: 2, limit: 1, total: 2, totalPages: 2 },
  ],
};

describe('remplacerDansListe', () => {
  it('swaps the ouvrage with the same id on any page and leaves the others untouched', () => {
    const modifie = { ...ouvrageExemple, lu: false, version: 4 };

    const resultat = remplacerDansListe(donnees, modifie);

    expect(resultat.pages[1]?.items[0]).toBe(modifie);
    expect(resultat.pages[0]?.items[0]).toBe(autre);
    expect(donnees.pages[1]?.items[0]).toBe(ouvrageExemple);
  });
});

describe('trouverDansListes', () => {
  it('finds an ouvrage inside any cached list, or nothing', () => {
    const client = new QueryClient();
    client.setQueryData(clesOuvrages.liste({ q: 'x' }), donnees);

    expect(trouverDansListes(client, ouvrageExemple.id)).toBe(ouvrageExemple);
    expect(trouverDansListes(client, 'inconnu')).toBeUndefined();
  });
});
