import { describe, expect, it } from '@jest/globals';

import { ErreurReseau, ErreurValidation } from '@/domain/erreurs';
import { repartirErreur } from '@/features/books/erreursFormulaire';

describe('repartirErreur', () => {
  it('routes each field of a 422 to its form field', () => {
    const erreur = new ErreurValidation('Validation', {
      titre: 'champ obligatoire',
      annee: 'annee invalide',
    });

    expect(repartirErreur(erreur)).toEqual({
      parChamp: { titre: 'champ obligatoire', annee: 'annee invalide' },
      globale: null,
    });
  });

  it('keeps unknown fields visible instead of dropping them', () => {
    const erreur = new ErreurValidation('Validation', { couverture: 'trop lourde' });

    expect(repartirErreur(erreur)).toEqual({
      parChamp: {},
      globale: 'couverture : trop lourde',
    });
  });

  it('turns any other error into a single readable message', () => {
    const erreur = new ErreurReseau('indisponible', 'Service indisponible', 503);

    const reparties = repartirErreur(erreur);

    expect(reparties.parChamp).toEqual({});
    expect(reparties.globale).toContain('momentanément indisponible');
  });
});
