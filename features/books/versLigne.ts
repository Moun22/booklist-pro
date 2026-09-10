import type { LigneOuvrage } from '@/components/BookRow';
import type { Ouvrage } from '@/domain/ouvrage';

const NOTE_MAX = 5;

export function versLigne(ouvrage: Ouvrage): LigneOuvrage {
  return {
    id: ouvrage.id,
    titre: ouvrage.titre,
    detail: [ouvrage.auteur, ouvrage.editeur, String(ouvrage.annee)]
      .filter((partie) => partie.length > 0)
      .join(' · '),
    note: ouvrage.note === null ? null : `${ouvrage.note}/${NOTE_MAX}`,
    lu: ouvrage.lu,
    coupDeCoeur: ouvrage.favori,
    description: decrireOuvrage(ouvrage),
  };
}

function decrireOuvrage(ouvrage: Ouvrage): string {
  const parties = [
    ouvrage.titre,
    ouvrage.auteur,
    String(ouvrage.annee),
    ouvrage.lu ? 'lu' : 'non lu',
  ];
  if (ouvrage.favori) {
    parties.push('coup de coeur');
  }
  if (ouvrage.note !== null) {
    parties.push(`note ${ouvrage.note} sur ${NOTE_MAX}`);
  }
  return parties.join(', ');
}
