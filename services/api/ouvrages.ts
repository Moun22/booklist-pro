import { clientHttp } from './client';
import {
  ouvrageSchema,
  type Ouvrage,
  type OuvrageRetouche,
  type OuvrageValide,
} from '@/domain/ouvrage';
import { pageSchema, type Page } from '@/domain/page';

export type TriOuvrages = 'titre' | 'auteur' | 'annee' | 'note' | 'updatedAt';
export type SensTri = 'asc' | 'desc';
export type FiltreLecture = 'lu' | 'nonlu';

export type RequeteFonds = {
  page?: number;
  limit?: number;
  q?: string;
  status?: FiltreLecture;
  favori?: boolean;
  auteur?: string;
  sort?: TriOuvrages;
  order?: SensTri;
};

const pageOuvragesSchema = pageSchema(ouvrageSchema);

export function listerOuvrages(
  requete: RequeteFonds = {},
  signal?: AbortSignal,
): Promise<Page<Ouvrage>> {
  return clientHttp.requeter(
    { chemin: `/books${construireQuery(requete)}`, signal },
    pageOuvragesSchema,
  );
}

export function obtenirOuvrage(id: string, signal?: AbortSignal): Promise<Ouvrage> {
  return clientHttp.requeter({ chemin: cheminOuvrage(id), signal }, ouvrageSchema);
}

export function creerOuvrage(saisie: OuvrageValide): Promise<Ouvrage> {
  return clientHttp.requeter(
    { methode: 'POST', chemin: '/books', corps: versCorpsApi(saisie) },
    ouvrageSchema,
  );
}

export function remplacerOuvrage(
  id: string,
  saisie: OuvrageValide,
  version: number,
): Promise<Ouvrage> {
  return clientHttp.requeter(
    {
      methode: 'PUT',
      chemin: cheminOuvrage(id),
      corps: versCorpsApi(saisie),
      entetes: { 'If-Match': String(version) },
    },
    ouvrageSchema,
  );
}

export function retoucherOuvrage(
  id: string,
  retouche: OuvrageRetouche,
  version?: number,
): Promise<Ouvrage> {
  return clientHttp.requeter(
    {
      methode: 'PATCH',
      chemin: cheminOuvrage(id),
      corps: versCorpsApi(retouche),
      entetes: version === undefined ? {} : { 'If-Match': String(version) },
    },
    ouvrageSchema,
  );
}

export async function supprimerOuvrage(id: string): Promise<void> {
  await clientHttp.requeter({ methode: 'DELETE', chemin: cheminOuvrage(id) });
}

function cheminOuvrage(id: string): string {
  return `/books/${encodeURIComponent(id)}`;
}

// The API validates `couverture` as a string and answers 422 to null: an absent cover is an absent field.
function versCorpsApi(donnees: OuvrageRetouche): Record<string, unknown> {
  const { couverture, ...reste } = donnees;
  return couverture === null || couverture === undefined ? reste : { ...reste, couverture };
}

function construireQuery(requete: RequeteFonds): string {
  const parametres = new URLSearchParams();
  for (const [cle, valeur] of Object.entries(requete)) {
    if (valeur !== undefined && valeur !== '') {
      parametres.append(cle, String(valeur));
    }
  }
  const chaine = parametres.toString();
  return chaine.length === 0 ? '' : `?${chaine}`;
}
