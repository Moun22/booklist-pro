import type { z } from 'zod';

import { API_URL, DELAI_REQUETE_MS } from './config';
import { lireJsonOuUndefined, traduireEchecTransport, traduireReponseEchec } from './traduireErreurs';
import { ErreurAuth, ErreurReseau } from '@/domain/erreurs';

export type MethodeHttp = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequeteHttp = {
  methode: MethodeHttp;
  chemin: string;
  entetes: Record<string, string>;
  corps?: unknown;
  signal?: AbortSignal;
};

export type OptionsRequete = {
  chemin: string;
  methode?: MethodeHttp;
  corps?: unknown;
  entetes?: Record<string, string>;
  signal?: AbortSignal;
};

export type Intercepteur = {
  preparer?: (requete: RequeteHttp) => RequeteHttp | Promise<RequeteHttp>;
  reprendre?: (erreur: ErreurAuth, rejouer: () => Promise<Response>) => Promise<Response>;
};

export type ConfigClientHttp = {
  baseUrl: string;
  delaiMs: number;
  transport?: typeof fetch;
};

export function creerClientHttp({ baseUrl, delaiMs, transport }: ConfigClientHttp) {
  let intercepteur: Intercepteur = {};
  const envoyerViaTransport: typeof fetch = transport ?? ((entree, init) => fetch(entree, init));

  async function envoyer(requete: RequeteHttp): Promise<Response> {
    const preparee = intercepteur.preparer ? await intercepteur.preparer(requete) : requete;
    const { signal, liberer } = bornerParDelai(preparee.signal, delaiMs);
    try {
      return await envoyerViaTransport(`${baseUrl}${preparee.chemin}`, {
        method: preparee.methode,
        headers: preparee.entetes,
        body: preparee.corps === undefined ? undefined : JSON.stringify(preparee.corps),
        signal,
      });
    } catch (erreur) {
      throw traduireEchecTransport(erreur, preparee.signal);
    } finally {
      liberer();
    }
  }

  async function requeter<T>(options: OptionsRequete, schema: z.ZodType<T>): Promise<T>;
  async function requeter(options: OptionsRequete): Promise<undefined>;
  async function requeter<T>(options: OptionsRequete, schema?: z.ZodType<T>): Promise<T | undefined> {
    const requete: RequeteHttp = {
      methode: options.methode ?? 'GET',
      chemin: options.chemin,
      corps: options.corps,
      signal: options.signal,
      entetes: {
        Accept: 'application/json',
        ...(options.corps === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...options.entetes,
      },
    };

    let reponse = await envoyer(requete);
    if (!reponse.ok) {
      const erreur = await traduireReponseEchec(reponse);
      if (!(erreur instanceof ErreurAuth) || intercepteur.reprendre === undefined) {
        throw erreur;
      }
      // Replaying goes through `preparer` again, so a refreshed token is injected before the retry.
      reponse = await intercepteur.reprendre(erreur, () => envoyer(requete));
      if (!reponse.ok) {
        throw await traduireReponseEchec(reponse);
      }
    }

    if (schema === undefined) {
      return undefined;
    }
    const lecture = schema.safeParse(await lireJsonOuUndefined(reponse));
    if (!lecture.success) {
      throw new ErreurReseau(
        'reponse-invalide',
        `Réponse inattendue pour ${requete.methode} ${requete.chemin}`,
        reponse.status,
      );
    }
    return lecture.data;
  }

  return {
    requeter,
    definirIntercepteur(prochain: Intercepteur) {
      intercepteur = prochain;
    },
  };
}

export type ClientHttp = ReturnType<typeof creerClientHttp>;

export const clientHttp = creerClientHttp({ baseUrl: API_URL, delaiMs: DELAI_REQUETE_MS });

function bornerParDelai(signalAppelant: AbortSignal | undefined, delaiMs: number) {
  const controleur = new AbortController();
  const annuler = () => controleur.abort();
  const minuterie = setTimeout(annuler, delaiMs);
  if (signalAppelant?.aborted) {
    annuler();
  } else {
    signalAppelant?.addEventListener('abort', annuler);
  }
  return {
    signal: controleur.signal,
    liberer: () => {
      clearTimeout(minuterie);
      signalAppelant?.removeEventListener('abort', annuler);
    },
  };
}
