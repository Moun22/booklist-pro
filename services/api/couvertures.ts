import { clientHttp } from './client';
import { API_URL } from './config';
import type { SourceCouverture } from '@/domain/couverture';
import { ouvrageSchema, type Ouvrage } from '@/domain/ouvrage';

// The only place that turns the `couverture` field into something displayable:
// a relative path is served by the API, an absolute URL is left alone, nothing gives the stand-in.
export function resoudreCouverture(valeur: string | null): SourceCouverture {
  const propre = valeur?.trim() ?? '';
  if (propre.length === 0) {
    return { repli: true };
  }
  if (/^https?:\/\//i.test(propre)) {
    return { uri: propre };
  }
  return { uri: `${API_URL}${propre.startsWith('/') ? '' : '/'}${propre}` };
}

export function televerserCouverture(id: string, image: string, version: number): Promise<Ouvrage> {
  return clientHttp.requeter(
    {
      methode: 'POST',
      chemin: cheminCouverture(id),
      corps: { image },
      entetes: { 'If-Match': String(version) },
    },
    ouvrageSchema,
  );
}

export function retirerCouverture(id: string, version: number): Promise<Ouvrage> {
  return clientHttp.requeter(
    { methode: 'DELETE', chemin: cheminCouverture(id), entetes: { 'If-Match': String(version) } },
    ouvrageSchema,
  );
}

function cheminCouverture(id: string): string {
  return `/books/${encodeURIComponent(id)}/cover`;
}
