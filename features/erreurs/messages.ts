import { estErreurApplicative, type ErreurReseau } from '@/domain/erreurs';

export type MessageErreur = {
  titre: string;
  detail: string;
};

export function messagePourErreur(erreur: unknown): MessageErreur {
  if (!estErreurApplicative(erreur)) {
    return {
      titre: 'Une erreur inattendue est survenue',
      detail: 'Réessayez. Si le problème persiste, prévenez le responsable technique.',
    };
  }
  switch (erreur.type) {
    case 'reseau':
      return messageReseau(erreur);
    case 'validation':
      return { titre: 'Certaines informations sont invalides', detail: erreur.message };
    case 'conflit':
      return {
        titre: 'Cette fiche a été modifiée entre temps',
        detail: 'Une autre personne a enregistré une version plus récente.',
      };
    case 'auth':
      return erreur.statut === 403
        ? { titre: 'Action non autorisée', detail: 'Votre compte est en lecture seule.' }
        : { titre: 'Session expirée', detail: 'Reconnectez-vous pour continuer.' };
    case 'introuvable':
      return {
        titre: 'Ouvrage introuvable',
        detail: 'Il a peut-être été supprimé depuis un autre poste.',
      };
  }
}

function messageReseau(erreur: ErreurReseau): MessageErreur {
  switch (erreur.cause) {
    case 'hors-ligne':
      return {
        titre: 'Le serveur est injoignable',
        detail: 'Vérifiez la connexion du poste, puis réessayez.',
      };
    case 'delai':
      return {
        titre: 'Le serveur met trop de temps à répondre',
        detail: 'La liaison est lente. Réessayez dans un instant.',
      };
    case 'indisponible':
      return {
        titre: 'Le service est momentanément indisponible',
        detail: 'Le serveur a répondu 503. Réessayez dans quelques secondes.',
      };
    case 'reponse-invalide':
      return {
        titre: 'Réponse du serveur inattendue',
        detail: "L'API n'a pas renvoyé le format attendu. Prévenez le responsable technique.",
      };
    case 'inconnue':
      return { titre: 'Le serveur a renvoyé une erreur', detail: erreur.message };
  }
}
