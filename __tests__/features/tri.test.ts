import { describe, expect, it } from '@jest/globals';

import {
  choisirTri,
  estCleTri,
  libelleTri,
  sensParDefaut,
  TRI_PAR_DEFAUT,
} from '@/features/books/tri';

describe('tri du fonds', () => {
  it('starts on the title, ascending', () => {
    expect(TRI_PAR_DEFAUT).toEqual({ cle: 'titre', sens: 'asc' });
    expect(libelleTri(TRI_PAR_DEFAUT)).toBe('Titre');
  });

  it('reads text and years from the start but ratings from the best', () => {
    expect(sensParDefaut('titre')).toBe('asc');
    expect(sensParDefaut('annee')).toBe('asc');
    expect(sensParDefaut('note')).toBe('desc');
  });

  it('switches to a new criterion with its default direction', () => {
    expect(choisirTri(TRI_PAR_DEFAUT, 'note')).toEqual({ cle: 'note', sens: 'desc' });
  });

  it('reverses the direction when the same criterion is chosen again', () => {
    const inverse = choisirTri(TRI_PAR_DEFAUT, 'titre');
    expect(inverse).toEqual({ cle: 'titre', sens: 'desc' });
    expect(choisirTri(inverse, 'titre')).toEqual(TRI_PAR_DEFAUT);
  });

  it('only recognises the criteria offered to the librarian', () => {
    expect(estCleTri('annee')).toBe(true);
    expect(estCleTri('updatedAt')).toBe(false);
  });
});
