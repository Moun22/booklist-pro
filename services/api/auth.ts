import { creerClientHttp } from './client';
import { API_URL, DELAI_REQUETE_MS } from './config';
import {
  connexionReponseSchema,
  etatServeurSchema,
  rafraichissementReponseSchema,
  type Jetons,
  type Utilisateur,
} from '@/domain/session';

// Its own client, without interceptor: a refused login or refresh must never try to refresh itself.
const clientAuth = creerClientHttp({ baseUrl: API_URL, delaiMs: DELAI_REQUETE_MS });

export type Connexion = {
  jetons: Jetons;
  utilisateur: Utilisateur;
};

export async function seConnecter(email: string, motDePasse: string): Promise<Connexion> {
  const reponse = await clientAuth.requeter(
    { methode: 'POST', chemin: '/auth/login', corps: { email, motDePasse } },
    connexionReponseSchema,
  );
  return {
    jetons: { accessToken: reponse.accessToken, refreshToken: reponse.refreshToken },
    utilisateur: reponse.utilisateur,
  };
}

export async function rafraichirJeton(refreshToken: string): Promise<string> {
  const reponse = await clientAuth.requeter(
    { methode: 'POST', chemin: '/auth/refresh', corps: { refreshToken } },
    rafraichissementReponseSchema,
  );
  return reponse.accessToken;
}

// The server says whether it wants a token; /health is the one route the chaos mode spares.
export async function lireExigenceAuth(signal?: AbortSignal): Promise<boolean> {
  const reponse = await clientAuth.requeter({ chemin: '/health', signal }, etatServeurSchema);
  return reponse.authRequise;
}
