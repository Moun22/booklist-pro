import type { SensTri, TriOuvrages } from '@/services/api/ouvrages';

export type CleTri = Exclude<TriOuvrages, 'updatedAt'>;

export type Tri = {
  cle: CleTri;
  sens: SensTri;
};

export const CLES_TRI: readonly CleTri[] = ['titre', 'auteur', 'annee', 'note'];

export const TRI_PAR_DEFAUT: Tri = { cle: 'titre', sens: 'asc' };

export function estCleTri(valeur: string): valeur is CleTri {
  return (CLES_TRI as readonly string[]).includes(valeur);
}

// A librarian who sorts by note wants the best rated first; text and years read from the start.
export function sensParDefaut(cle: CleTri): SensTri {
  return cle === 'note' ? 'desc' : 'asc';
}

export function choisirTri(courant: Tri, cle: CleTri): Tri {
  if (courant.cle === cle) {
    return { cle, sens: courant.sens === 'asc' ? 'desc' : 'asc' };
  }
  return { cle, sens: sensParDefaut(cle) };
}
