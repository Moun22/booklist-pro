import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { z } from 'zod';

import type { ErreurAuth } from '@/domain/erreurs';
import { jetonsSchema, peutEcrire, utilisateurSchema } from '@/domain/session';
import type { Jetons, Utilisateur } from '@/domain/session';
import { lireExigenceAuth, rafraichirJeton, seConnecter } from '@/services/api/auth';
import { clientHttp } from '@/services/api/client';
import { creerIntercepteurAuth } from '@/services/api/intercepteurAuth';
import { stockage } from '@/services/stockage';
import { stockageSecurise } from '@/services/stockageSecurise';

export type EtatSession = 'chargement' | 'anonyme' | 'connecte';

export type Session = {
  etat: EtatSession;
  utilisateur: Utilisateur | null;
  // Becomes true the first time the server asks for a token, or when a session was stored.
  authRequise: boolean;
  peutEcrire: boolean;
  connexion: (email: string, motDePasse: string) => Promise<void>;
  deconnexion: () => Promise<void>;
};

const CLES = { jetons: 'session.jetons', utilisateur: 'session.utilisateur' } as const;

// The interceptor is installed at import time, so no request can leave before it exists,
// whatever the mount order of the screens. The provider only fills this box.
const liaison: {
  jetons: Jetons | null;
  surJetonRenouvele: (accessToken: string) => void;
  surSessionPerdue: (erreur: ErreurAuth) => void;
} = { jetons: null, surJetonRenouvele: () => {}, surSessionPerdue: () => {} };

clientHttp.definirIntercepteur(
  creerIntercepteurAuth({
    lireJetons: () => liaison.jetons,
    rafraichir: rafraichirJeton,
    surJetonRenouvele: (accessToken) => liaison.surJetonRenouvele(accessToken),
    surSessionPerdue: (erreur) => liaison.surSessionPerdue(erreur),
  }),
);

const SessionContext = createContext<Session | null>(null);

function lireJson<T>(schema: z.ZodType<T>, brut: string | null): T | null {
  if (brut === null) {
    return null;
  }
  try {
    const lecture = schema.safeParse(JSON.parse(brut));
    return lecture.success ? lecture.data : null;
  } catch {
    return null;
  }
}

type Props = {
  children: ReactNode;
  // Ask the server at startup whether it wants a token, so a protected screen never shows first.
  sonderServeur?: boolean;
};

export function SessionProvider({ children, sonderServeur = false }: Props) {
  const client = useQueryClient();
  const [etat, setEtat] = useState<EtatSession>('chargement');
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [authRequise, setAuthRequise] = useState(false);

  const oublier = useCallback(async () => {
    liaison.jetons = null;
    setUtilisateur(null);
    setEtat('anonyme');
    await Promise.all([stockageSecurise.effacer(CLES.jetons), stockage.effacer(CLES.utilisateur)]);
  }, []);

  useEffect(() => {
    const controleur = new AbortController();
    const restaurer = async () => {
      const [jetonsBruts, utilisateurBrut] = await Promise.all([
        stockageSecurise.lire(CLES.jetons),
        stockage.lire(CLES.utilisateur),
      ]);
      const jetons = lireJson(jetonsSchema, jetonsBruts);
      const compte = lireJson(utilisateurSchema, utilisateurBrut);
      if (jetons !== null && compte !== null) {
        liaison.jetons = jetons;
        setUtilisateur(compte);
        setAuthRequise(true);
        setEtat('connecte');
        return;
      }
      // A server that cannot be reached leaves the question open: the fonds will say so itself.
      const requise = sonderServeur
        ? await lireExigenceAuth(controleur.signal).catch(() => false)
        : false;
      if (!controleur.signal.aborted) {
        setAuthRequise(requise);
        setEtat('anonyme');
      }
    };
    void restaurer();
    return () => controleur.abort();
  }, [sonderServeur]);

  useEffect(() => {
    liaison.surJetonRenouvele = (accessToken) => {
      if (liaison.jetons !== null) {
        liaison.jetons = { ...liaison.jetons, accessToken };
        void stockageSecurise.ecrire(CLES.jetons, JSON.stringify(liaison.jetons));
      }
    };
    liaison.surSessionPerdue = () => {
      setAuthRequise(true);
      void oublier();
    };
    return () => {
      liaison.jetons = null;
      liaison.surJetonRenouvele = () => {};
      liaison.surSessionPerdue = () => {};
    };
  }, [oublier]);

  const connexion = useCallback(
    async (email: string, motDePasse: string) => {
      const { jetons, utilisateur: compte } = await seConnecter(email, motDePasse);
      liaison.jetons = jetons;
      setUtilisateur(compte);
      setAuthRequise(true);
      setEtat('connecte');
      await Promise.all([
        stockageSecurise.ecrire(CLES.jetons, JSON.stringify(jetons)),
        stockage.ecrire(CLES.utilisateur, JSON.stringify(compte)),
      ]);
      // Queries refused before the login start again with the token.
      await client.resetQueries();
    },
    [client],
  );

  const deconnexion = useCallback(async () => {
    await oublier();
    client.clear();
  }, [oublier, client]);

  const valeur = useMemo<Session>(
    () => ({
      etat,
      utilisateur,
      authRequise,
      peutEcrire: utilisateur === null ? !authRequise : peutEcrire(utilisateur.role),
      connexion,
      deconnexion,
    }),
    [etat, utilisateur, authRequise, connexion, deconnexion],
  );

  return <SessionContext.Provider value={valeur}>{children}</SessionContext.Provider>;
}

export function useSession(): Session {
  const session = useContext(SessionContext);
  if (session === null) {
    throw new Error('useSession must be used inside a SessionProvider.');
  }
  return session;
}
