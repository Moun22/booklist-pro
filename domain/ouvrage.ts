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

const messageAnnee = `Année comprise entre ${LIMITES_OUVRAGE.anneeMin} et ${anneeMax()}`;
const messageNote = `Note entre ${LIMITES_OUVRAGE.noteMin} et ${LIMITES_OUVRAGE.noteMax}`;
const messageAnneeEntiere = "L'année doit être un nombre entier";

export const champsOuvrage = {
  titre: z
    .string()
    .trim()
    .min(1, 'Le titre est obligatoire')
    .max(LIMITES_OUVRAGE.titreMax, `${LIMITES_OUVRAGE.titreMax} caractères maximum`),
  auteur: z
    .string()
    .trim()
    .min(1, "L'auteur est obligatoire")
    .max(LIMITES_OUVRAGE.auteurMax, `${LIMITES_OUVRAGE.auteurMax} caractères maximum`),
  editeur: z
    .string()
    .trim()
    .max(LIMITES_OUVRAGE.editeurMax, `${LIMITES_OUVRAGE.editeurMax} caractères maximum`),
  annee: z
    .number({ error: messageAnneeEntiere })
    .int(messageAnneeEntiere)
    .min(LIMITES_OUVRAGE.anneeMin, messageAnnee)
    .max(anneeMax(), messageAnnee),
  lu: z.boolean(),
  favori: z.boolean(),
  note: z
    .number()
    .min(LIMITES_OUVRAGE.noteMin, messageNote)
    .max(LIMITES_OUVRAGE.noteMax, messageNote)
    .nullable(),
  couverture: z
    .string()
    .trim()
    .max(LIMITES_OUVRAGE.couvertureMax, `${LIMITES_OUVRAGE.couvertureMax} caractères maximum`)
    .nullable(),
};

export const ouvrageSaisieSchema = z.object({
  ...champsOuvrage,
  editeur: champsOuvrage.editeur.default(''),
  lu: champsOuvrage.lu.default(false),
  favori: champsOuvrage.favori.default(false),
  note: champsOuvrage.note.default(null),
  couverture: champsOuvrage.couverture.default(null),
});

export type OuvrageSaisie = z.input<typeof ouvrageSaisieSchema>;
export type OuvrageValide = z.output<typeof ouvrageSaisieSchema>;

export const ouvrageRetoucheSchema = z.object(champsOuvrage).partial();

export type OuvrageRetouche = z.output<typeof ouvrageRetoucheSchema>;

// A text field feeds the year: the schema turns the typed string into the validated number.
export const ouvrageFormulaireSchema = z.object({
  titre: champsOuvrage.titre,
  auteur: champsOuvrage.auteur,
  editeur: champsOuvrage.editeur,
  annee: z
    .string()
    .trim()
    .min(1, "L'année est obligatoire")
    .pipe(z.coerce.number({ error: messageAnneeEntiere }))
    .pipe(champsOuvrage.annee),
  lu: champsOuvrage.lu,
});

export type SaisieFormulaire = z.input<typeof ouvrageFormulaireSchema>;
export type OuvrageFormulaire = z.output<typeof ouvrageFormulaireSchema>;
