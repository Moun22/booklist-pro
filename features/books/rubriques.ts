import type { RequeteFonds } from '@/services/api/ouvrages';

export type Rubrique = 'tout' | 'lus' | 'nonLus' | 'coupsDeCoeur';

export const RUBRIQUES: readonly { cle: Rubrique; libelle: string }[] = [
  { cle: 'tout', libelle: 'Fonds' },
  { cle: 'lus', libelle: 'Lus' },
  { cle: 'nonLus', libelle: 'Non lus' },
  { cle: 'coupsDeCoeur', libelle: 'Coups de coeur' },
];

export function estRubrique(valeur: string): valeur is Rubrique {
  return RUBRIQUES.some((rubrique) => rubrique.cle === valeur);
}

export function versRequeteFonds(rubrique: Rubrique, recherche: string): RequeteFonds {
  const q = recherche.trim();
  const base: RequeteFonds = q.length > 0 ? { q } : {};
  switch (rubrique) {
    case 'tout':
      return base;
    case 'lus':
      return { ...base, status: 'lu' };
    case 'nonLus':
      return { ...base, status: 'nonlu' };
    case 'coupsDeCoeur':
      return { ...base, favori: true };
  }
}
