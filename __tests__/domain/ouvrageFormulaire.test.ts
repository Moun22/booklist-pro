import { describe, expect, it } from '@jest/globals';

import { anneeMax, creerOuvrageFormulaireSchema } from '@/domain/ouvrage';
import { fr } from '@/features/i18n/fr';

const ouvrageFormulaireSchema = creerOuvrageFormulaireSchema(fr.validation);

function messagesParChamp(resultat: {
  error?: { issues: { path: PropertyKey[]; message: string }[] };
}) {
  return Object.fromEntries(
    (resultat.error?.issues ?? []).map((probleme) => [String(probleme.path[0]), probleme.message]),
  );
}

describe('ouvrageFormulaireSchema', () => {
  it('turns the typed year into a number and trims the text fields', () => {
    const resultat = ouvrageFormulaireSchema.safeParse({
      titre: ' Dune ',
      auteur: 'Frank Herbert',
      editeur: ' Robert Laffont ',
      annee: ' 1965 ',
      lu: true,
    });

    expect(resultat.success).toBe(true);
    expect(resultat.data).toEqual({
      titre: 'Dune',
      auteur: 'Frank Herbert',
      editeur: 'Robert Laffont',
      annee: 1965,
      lu: true,
    });
  });

  it('names a missing year, a non-numeric year and an out-of-range year differently', () => {
    const vide = ouvrageFormulaireSchema.safeParse({
      titre: 'X',
      auteur: 'Y',
      editeur: '',
      annee: '',
      lu: false,
    });
    const lettres = ouvrageFormulaireSchema.safeParse({
      titre: 'X',
      auteur: 'Y',
      editeur: '',
      annee: 'abc',
      lu: false,
    });
    const trop = ouvrageFormulaireSchema.safeParse({
      titre: 'X',
      auteur: 'Y',
      editeur: '',
      annee: '1200',
      lu: false,
    });

    expect(messagesParChamp(vide).annee).toBe("L'année est obligatoire");
    expect(messagesParChamp(lettres).annee).toBe("L'année doit être un nombre entier");
    expect(messagesParChamp(trop).annee).toBe(`Année comprise entre 1450 et ${anneeMax()}`);
  });

  it('reports the empty required fields together', () => {
    const resultat = ouvrageFormulaireSchema.safeParse({
      titre: '',
      auteur: '  ',
      editeur: '',
      annee: '',
      lu: false,
    });

    expect(messagesParChamp(resultat)).toEqual({
      titre: 'Le titre est obligatoire',
      auteur: "L'auteur est obligatoire",
      annee: "L'année est obligatoire",
    });
  });
});
