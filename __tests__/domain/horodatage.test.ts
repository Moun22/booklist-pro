import { describe, expect, it } from '@jest/globals';

import { formaterHorodatage } from '@/domain/horodatage';

describe('formaterHorodatage', () => {
  it('writes the date and the time in the given locale', () => {
    const texte = formaterHorodatage('2026-09-12T14:32:00.000Z', 'fr-FR');
    expect(texte).toContain('2026');
    expect(texte).toContain('sept.');
    expect(texte).toMatch(/\d{2}:\d{2}/);
  });

  it('differs between locales', () => {
    const iso = '2026-09-12T14:32:00.000Z';
    expect(formaterHorodatage(iso, 'en-GB')).not.toBe(formaterHorodatage(iso, 'fr-FR'));
  });

  it('gives the raw value back when it is not a date', () => {
    expect(formaterHorodatage('pas une date')).toBe('pas une date');
  });
});
