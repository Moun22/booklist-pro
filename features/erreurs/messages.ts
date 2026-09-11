import { estErreurApplicative, type ErreurReseau } from '@/domain/erreurs';
import type { Dictionnaire } from '@/features/i18n/fr';

export type MessageErreur = {
  titre: string;
  detail: string;
};

export type MessagesErreurs = Dictionnaire['erreurs'];

export function messagePourErreur(erreur: unknown, m: MessagesErreurs): MessageErreur {
  if (!estErreurApplicative(erreur)) {
    return m.inattendue;
  }
  switch (erreur.type) {
    case 'reseau':
      return messageReseau(erreur, m);
    case 'validation':
      return { titre: m.validation, detail: erreur.message };
    case 'conflit':
      return m.conflit;
    case 'auth':
      if (erreur.code === 'identifiants_invalides') {
        return m.identifiantsInvalides;
      }
      return erreur.statut === 403 ? m.nonAutorise : m.sessionExpiree;
    case 'introuvable':
      return m.introuvable;
  }
}

function messageReseau(erreur: ErreurReseau, m: MessagesErreurs): MessageErreur {
  switch (erreur.cause) {
    case 'hors-ligne':
      return m.horsLigne;
    case 'delai':
      return m.delai;
    case 'indisponible':
      return m.indisponible;
    case 'reponse-invalide':
      return m.reponseInvalide;
    case 'inconnue':
      return { titre: m.inconnue, detail: erreur.message };
  }
}
