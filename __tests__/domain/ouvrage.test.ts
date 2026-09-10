import { describe, expect, it } from '@jest/globals';

import { ouvrageExemple } from '../helpers/fixtures';
import { anneeMax, ouvrageRetoucheSchema, ouvrageSaisieSchema, ouvrageSchema } from '@/domain/ouvrage';

function messagesParChamp(resultat: { success: boolean; error?: { issues: { path: PropertyKey[]; message: string }[] } }) {
  return Object.fromEntries(
    (resultat.error?.issues ?? []).map((probleme) => [String(probleme.path[0]), probleme.message]),
  );
}

describe('ouvrageSchema', () => {
  it('accepts an ouvrage as the API serves it', () => {
    expect(ouvrageSchema.safeParse(ouvrageExemple).success).toBe(true);
  });

  it('rejects a note outside 0 to 5 and a missing version', () => {
    expect(ouvrageSchema.safeParse({ ...ouvrageExemple, note: 6 }).success).toBe(false);
    const { version: _version, ...sansVersion } = ouvrageExemple;
    expect(ouvrageSchema.safeParse(sansVersion).success).toBe(false);
  });
});

describe('ouvrageSaisieSchema', () => {
  it('trims text fields and applies the defaults of a new ouvrage', () => {
    const resultat = ouvrageSaisieSchema.safeParse({ titre: '  Dune ', auteur: 'Herbert', annee: 1965 });

    expect(resultat.success).toBe(true);
    expect(resultat.data).toEqual({
      titre: 'Dune',
      auteur: 'Herbert',
      editeur: '',
      annee: 1965,
      lu: false,
      favori: false,
      note: null,
      couverture: null,
    });
  });

  it('names every invalid field', () => {
    const resultat = ouvrageSaisieSchema.safeParse({ titre: '   ', auteur: '', annee: 1200, note: 9 });

    expect(resultat.success).toBe(false);
    expect(messagesParChamp(resultat)).toEqual({
      titre: 'Le titre est obligatoire',
      auteur: "L'auteur est obligatoire",
      annee: `Année comprise entre 1450 et ${anneeMax()}`,
      note: 'Note entre 0 et 5',
    });
  });

  it('refuses a year beyond next year', () => {
    const tropLoin = anneeMax() + 1;
    expect(ouvrageSaisieSchema.safeParse({ titre: 'X', auteur: 'Y', annee: tropLoin }).success).toBe(false);
    expect(ouvrageSaisieSchema.safeParse({ titre: 'X', auteur: 'Y', annee: anneeMax() }).success).toBe(true);
  });
});

describe('ouvrageRetoucheSchema', () => {
  it('keeps a partial update partial: no defaults are injected', () => {
    const resultat = ouvrageRetoucheSchema.safeParse({ favori: true });

    expect(resultat.success).toBe(true);
    expect(resultat.data).toEqual({ favori: true });
  });
});
