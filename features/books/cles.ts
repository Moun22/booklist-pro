import type { RequeteFonds } from '@/services/api/ouvrages';

const RACINE = ['ouvrages'] as const;

export const clesOuvrages = {
  tout: RACINE,
  listes: () => [...RACINE, 'liste'] as const,
  liste: (requete: RequeteFonds) => [...RACINE, 'liste', requete] as const,
  details: () => [...RACINE, 'detail'] as const,
  detail: (id: string) => [...RACINE, 'detail', id] as const,
};
