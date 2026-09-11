const RACINE = ['notes'] as const;

export const clesNotes = {
  tout: RACINE,
  parOuvrage: (livreId: string) => [...RACINE, livreId] as const,
};
