import { z } from 'zod';

import {
  ErreurAuth,
  ErreurConflit,
  ErreurIntrouvable,
  ErreurReseau,
  ErreurValidation,
  type CodeAuth,
  type ErreurApplicative,
} from '@/domain/erreurs';
import { ouvrageSchema } from '@/domain/ouvrage';

const corpsErreurSchema = z.object({
  erreur: z.string().optional(),
  message: z.string().optional(),
  champs: z.record(z.string(), z.string()).optional(),
  serveur: z.unknown().optional(),
  versionAttendue: z.number().int().optional(),
});

const CODES_AUTH: readonly string[] = [
  'jeton_absent',
  'jeton_expire',
  'jeton_invalide',
  'droits_insuffisants',
  'identifiants_invalides',
  'refresh_invalide',
] satisfies readonly CodeAuth[];

function estCodeAuth(valeur: string | undefined): valeur is CodeAuth {
  return valeur !== undefined && CODES_AUTH.includes(valeur);
}

export async function lireJsonOuUndefined(reponse: Response): Promise<unknown> {
  const texte = await reponse.text();
  if (texte.length === 0) {
    return undefined;
  }
  try {
    return JSON.parse(texte) as unknown;
  } catch {
    return undefined;
  }
}

export async function traduireReponseEchec(reponse: Response): Promise<ErreurApplicative> {
  const lecture = corpsErreurSchema.safeParse(await lireJsonOuUndefined(reponse));
  const detail = lecture.success ? lecture.data : {};
  const message = detail.message ?? `Erreur HTTP ${reponse.status}`;

  switch (reponse.status) {
    case 401:
    case 403: {
      const code = estCodeAuth(detail.erreur) ? detail.erreur : 'jeton_invalide';
      return new ErreurAuth(code, message, reponse.status === 401 ? 401 : 403);
    }
    case 404:
      return new ErreurIntrouvable(message);
    case 409: {
      const serveur = ouvrageSchema.safeParse(detail.serveur);
      if (!serveur.success) {
        return new ErreurReseau('reponse-invalide', message, reponse.status);
      }
      return new ErreurConflit(
        message,
        serveur.data,
        detail.versionAttendue ?? serveur.data.version,
      );
    }
    case 413:
    case 415:
    case 422:
      return new ErreurValidation(message, detail.champs ?? {}, reponse.status);
    case 503:
      return new ErreurReseau('indisponible', message, reponse.status);
    default:
      return new ErreurReseau('inconnue', message, reponse.status);
  }
}

export function traduireEchecTransport(
  erreur: unknown,
  signalAppelant: AbortSignal | undefined,
): unknown {
  if (signalAppelant?.aborted) {
    return erreur;
  }
  if (erreur instanceof Error && erreur.name === 'AbortError') {
    return new ErreurReseau('delai', "Le serveur n'a pas répondu dans le délai imparti");
  }
  return new ErreurReseau('hors-ligne', 'Impossible de joindre le serveur');
}
