import { z } from 'zod';

export const LIMITES_OUVRAGE = {
  titreMax: 200,
  auteurMax: 200,
  editeurMax: 200,
  couvertureMax: 500,
  anneeMin: 1450,
  noteMin: 0,
  noteMax: 5,
} as const;

export function anneeMax(reference: Date = new Date()): number {
  return reference.getFullYear() + 1;
}

export const ouvrageSchema = z.object({
  id: z.string().min(1),
  titre: z.string(),
  auteur: z.string(),
  editeur: z.string(),
  annee: z.number().int(),
  lu: z.boolean(),
  favori: z.boolean(),
  note: z.number().min(LIMITES_OUVRAGE.noteMin).max(LIMITES_OUVRAGE.noteMax).nullable(),
  couverture: z.string().nullable(),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
  version: z.number().int().nonnegative(),
});

export type Ouvrage = z.infer<typeof ouvrageSchema>;

// The rules live here; the words the librarian reads come from the active language.
export type MessagesOuvrage = {
  titreObligatoire: string;
  auteurObligatoire: string;
  anneeObligatoire: string;
  anneeEntiere: string;
  anneeBornes: (min: number, max: number) => string;
  noteBornes: (min: number, max: number) => string;
  maxCaracteres: (max: number) => string;
};

export function creerChampsOuvrage(m: MessagesOuvrage) {
  const annee = m.anneeBornes(LIMITES_OUVRAGE.anneeMin, anneeMax());
  const note = m.noteBornes(LIMITES_OUVRAGE.noteMin, LIMITES_OUVRAGE.noteMax);
  return {
    titre: z
      .string()
      .trim()
      .min(1, m.titreObligatoire)
      .max(LIMITES_OUVRAGE.titreMax, m.maxCaracteres(LIMITES_OUVRAGE.titreMax)),
    auteur: z
      .string()
      .trim()
      .min(1, m.auteurObligatoire)
      .max(LIMITES_OUVRAGE.auteurMax, m.maxCaracteres(LIMITES_OUVRAGE.auteurMax)),
    editeur: z
      .string()
      .trim()
      .max(LIMITES_OUVRAGE.editeurMax, m.maxCaracteres(LIMITES_OUVRAGE.editeurMax)),
    annee: z
      .number({ error: m.anneeEntiere })
      .int(m.anneeEntiere)
      .min(LIMITES_OUVRAGE.anneeMin, annee)
      .max(anneeMax(), annee),
    lu: z.boolean(),
    favori: z.boolean(),
    note: z
      .number()
      .min(LIMITES_OUVRAGE.noteMin, note)
      .max(LIMITES_OUVRAGE.noteMax, note)
      .nullable(),
    couverture: z
      .string()
      .trim()
      .max(LIMITES_OUVRAGE.couvertureMax, m.maxCaracteres(LIMITES_OUVRAGE.couvertureMax))
      .nullable(),
  };
}

export function creerOuvrageSaisieSchema(m: MessagesOuvrage) {
  const champs = creerChampsOuvrage(m);
  return z.object({
    ...champs,
    editeur: champs.editeur.default(''),
    lu: champs.lu.default(false),
    favori: champs.favori.default(false),
    note: champs.note.default(null),
    couverture: champs.couverture.default(null),
  });
}

export type OuvrageSaisie = z.input<ReturnType<typeof creerOuvrageSaisieSchema>>;
export type OuvrageValide = z.output<ReturnType<typeof creerOuvrageSaisieSchema>>;

export function creerOuvrageRetoucheSchema(m: MessagesOuvrage) {
  return z.object(creerChampsOuvrage(m)).partial();
}

export type OuvrageRetouche = z.output<ReturnType<typeof creerOuvrageRetoucheSchema>>;

// A text field feeds the year: the schema turns the typed string into the validated number.
export function creerOuvrageFormulaireSchema(m: MessagesOuvrage) {
  const champs = creerChampsOuvrage(m);
  return z.object({
    titre: champs.titre,
    auteur: champs.auteur,
    editeur: champs.editeur,
    annee: z
      .string()
      .trim()
      .min(1, m.anneeObligatoire)
      .pipe(z.coerce.number({ error: m.anneeEntiere }))
      .pipe(champs.annee),
    lu: champs.lu,
  });
}

export type SaisieFormulaire = z.input<ReturnType<typeof creerOuvrageFormulaireSchema>>;
export type OuvrageFormulaire = z.output<ReturnType<typeof creerOuvrageFormulaireSchema>>;
