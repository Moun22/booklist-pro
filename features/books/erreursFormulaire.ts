import { ErreurValidation } from '@/domain/erreurs';
import type { SaisieFormulaire } from '@/domain/ouvrage';
import { messagePourErreur } from '@/features/erreurs/messages';

export const CHAMPS_FORMULAIRE = ['titre', 'auteur', 'editeur', 'annee', 'lu'] as const;

export type ChampFormulaire = (typeof CHAMPS_FORMULAIRE)[number];

export type ErreursFormulaire = {
  parChamp: Partial<Record<ChampFormulaire, string>>;
  globale: string | null;
};

function estChampFormulaire(nom: string): nom is ChampFormulaire {
  return (CHAMPS_FORMULAIRE as readonly string[]).includes(nom);
}

export function repartirErreur(erreur: unknown): ErreursFormulaire {
  if (!(erreur instanceof ErreurValidation)) {
    const message = messagePourErreur(erreur);
    return { parChamp: {}, globale: `${message.titre}. ${message.detail}` };
  }

  const parChamp: Partial<Record<keyof SaisieFormulaire, string>> = {};
  const horsFormulaire: string[] = [];
  for (const [champ, message] of Object.entries(erreur.champs)) {
    if (estChampFormulaire(champ)) {
      parChamp[champ] = message;
    } else {
      horsFormulaire.push(`${champ} : ${message}`);
    }
  }

  if (horsFormulaire.length > 0) {
    return { parChamp, globale: horsFormulaire.join(' · ') };
  }
  return { parChamp, globale: Object.keys(parChamp).length > 0 ? null : erreur.message };
}
