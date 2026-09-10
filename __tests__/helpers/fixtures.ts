import type { Ouvrage } from '@/domain/ouvrage';

export const ouvrageExemple: Ouvrage = {
  id: '2de93add-8241-478e-9c0b-8870586911c1',
  titre: 'La Cité des cendres',
  auteur: 'Ursula Le Guin',
  editeur: 'Le Bélial',
  annee: 1987,
  lu: true,
  favori: false,
  note: 4,
  couverture: null,
  createdAt: '2026-01-10T09:00:00.000Z',
  updatedAt: '2026-02-01T10:30:00.000Z',
  version: 3,
};

export function reponseJson(corps: unknown, statut = 200): Response {
  return new Response(JSON.stringify(corps), {
    status: statut,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function reponseVide(statut = 204): Response {
  return new Response(null, { status: statut });
}
