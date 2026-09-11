import type { LigneOuvrage } from '@/components/BookRow';
import { LIMITES_OUVRAGE, type Ouvrage } from '@/domain/ouvrage';
import type { Dictionnaire } from '@/features/i18n/fr';
import { resoudreCouverture } from '@/services/api/couvertures';

export type MessagesLigne = Dictionnaire['ligne'];

export function versLigne(ouvrage: Ouvrage, m: MessagesLigne): LigneOuvrage {
  return {
    id: ouvrage.id,
    titre: ouvrage.titre,
    detail: [ouvrage.auteur, ouvrage.editeur, String(ouvrage.annee)]
      .filter((partie) => partie.length > 0)
      .join(' · '),
    note: ouvrage.note === null ? null : `${ouvrage.note}/${LIMITES_OUVRAGE.noteMax}`,
    lu: ouvrage.lu,
    coupDeCoeur: ouvrage.favori,
    couverture: resoudreCouverture(ouvrage.couverture),
    couvertureLabel: m.couverture(ouvrage.titre),
    description: decrireOuvrage(ouvrage, m),
  };
}

function decrireOuvrage(ouvrage: Ouvrage, m: MessagesLigne): string {
  const parties = [
    ouvrage.titre,
    ouvrage.auteur,
    String(ouvrage.annee),
    ouvrage.lu ? m.lu : m.nonLu,
  ];
  if (ouvrage.favori) {
    parties.push(m.coupDeCoeur);
  }
  if (ouvrage.note !== null) {
    parties.push(m.note(ouvrage.note, LIMITES_OUVRAGE.noteMax));
  }
  return parties.join(', ');
}
