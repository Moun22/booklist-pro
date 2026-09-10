import { describe, expect, it } from '@jest/globals';

import { estRubrique, versRequeteFonds } from '@/features/books/rubriques';

describe('versRequeteFonds', () => {
  it('maps each rubric to the server-side filter', () => {
    expect(versRequeteFonds('tout', '')).toEqual({});
    expect(versRequeteFonds('lus', '')).toEqual({ status: 'lu' });
    expect(versRequeteFonds('nonLus', '')).toEqual({ status: 'nonlu' });
    expect(versRequeteFonds('coupsDeCoeur', '')).toEqual({ favori: true });
  });

  it('adds the trimmed search text and drops blank searches', () => {
    expect(versRequeteFonds('lus', '  dune ')).toEqual({ q: 'dune', status: 'lu' });
    expect(versRequeteFonds('tout', '   ')).toEqual({});
  });
});

describe('estRubrique', () => {
  it('accepts only known rubric keys', () => {
    expect(estRubrique('coupsDeCoeur')).toBe(true);
    expect(estRubrique('inconnue')).toBe(false);
  });
});
