import { describe, expect, it } from '@jest/globals';

import { estRubrique, versRequeteFonds } from '@/features/books/rubriques';

const triParDefaut = { sort: 'titre', order: 'asc' };

describe('versRequeteFonds', () => {
  it('maps each rubric to the server-side filter, sorted by title by default', () => {
    expect(versRequeteFonds('tout', '')).toEqual(triParDefaut);
    expect(versRequeteFonds('lus', '')).toEqual({ ...triParDefaut, status: 'lu' });
    expect(versRequeteFonds('nonLus', '')).toEqual({ ...triParDefaut, status: 'nonlu' });
    expect(versRequeteFonds('coupsDeCoeur', '')).toEqual({ ...triParDefaut, favori: true });
  });

  it('adds the trimmed search text and drops blank searches', () => {
    expect(versRequeteFonds('lus', '  dune ')).toEqual({
      ...triParDefaut,
      q: 'dune',
      status: 'lu',
    });
    expect(versRequeteFonds('tout', '   ')).toEqual(triParDefaut);
  });

  it('sends the chosen sort criterion and direction to the server', () => {
    expect(versRequeteFonds('tout', '', { cle: 'note', sens: 'desc' })).toEqual({
      sort: 'note',
      order: 'desc',
    });
  });
});

describe('estRubrique', () => {
  it('accepts only known rubric keys', () => {
    expect(estRubrique('coupsDeCoeur')).toBe(true);
    expect(estRubrique('inconnue')).toBe(false);
  });
});
