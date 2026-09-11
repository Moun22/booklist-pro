import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet, View } from 'react-native';

import { retirerDesListes, type DonneesListe } from './cacheOuvrages';
import { clesOuvrages } from './cles';
import { AppText } from '@/components/AppText';
import { UndoBar } from '@/components/UndoBar';
import type { Ouvrage } from '@/domain/ouvrage';
import { supprimerOuvrage } from '@/services/api/ouvrages';
import { motion } from '@/theme/tokens';

export const DELAI_ANNULATION_MS = 5000;

const labels = {
  supprime: 'supprimé',
  conserve: 'conservé',
  annuler: 'Annuler',
  echec: "n'a pas pu être supprimé",
  reessayer: 'Réessayer',
  fermer: 'Fermer',
};

type Attente = {
  ouvrage: Ouvrage;
  // The row fades for motion.quick before the lists drop it, then stays out until the DELETE.
  retiree: boolean;
  // Taken as the lists drop the row, so a list fetched during the fade is covered too.
  instantane: [QueryKey, DonneesListe | undefined][];
};

export type EnAttente = Pick<Attente, 'ouvrage' | 'retiree'>;

export type Suppression = {
  programmer: (ouvrage: Ouvrage) => void;
  annuler: () => void;
  enAttente: EnAttente | null;
  // The row the list should focus once a bar has left: the row put back by an undo or by a
  // refused DELETE, or the row the list named as the neighbour of the one that is gone.
  refugeId: string | null;
  oublierRefuge: () => void;
  nommerVoisine: (id: string | null) => void;
};

const SuppressionContext = createContext<Suppression | null>(null);

function citer(titre: string, suite: string) {
  return `« ${titre} » ${suite}`;
}

export function SuppressionProvider({ children }: { children: ReactNode }) {
  const client = useQueryClient();
  const attenteRef = useRef<Attente | null>(null);
  const minuteries = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [attente, setAttente] = useState<Attente | null>(null);
  const [echec, setEchec] = useState<Attente | null>(null);
  const [annonce, setAnnonce] = useState('');
  const [refugeId, setRefugeId] = useState<string | null>(null);
  const focusDansBarre = useRef(false);
  const voisineId = useRef<string | null>(null);

  const restaurer = useCallback(
    (cible: Attente) => {
      for (const [cle, donnees] of cible.instantane) {
        client.setQueryData(cle, donnees);
      }
    },
    [client],
  );

  const retirer = useCallback(
    (cible: Attente): Attente => {
      const filtre = { queryKey: clesOuvrages.listes() };
      const instantane = client.getQueriesData<DonneesListe>(filtre);
      client.setQueriesData<DonneesListe>(filtre, (donnees) =>
        donnees === undefined ? donnees : retirerDesListes(donnees, cible.ouvrage.id),
      );
      client.removeQueries({ queryKey: clesOuvrages.detail(cible.ouvrage.id) });
      return { ...cible, instantane, retiree: true };
    },
    [client],
  );

  const { mutate } = useMutation<void, unknown, Attente>({
    mutationFn: ({ ouvrage }) => supprimerOuvrage(ouvrage.id),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: clesOuvrages.listes() });
    },
    onError: (_erreur, cible) => {
      restaurer(cible);
      setEchec(cible);
      setAnnonce(citer(cible.ouvrage.titre, labels.echec));
    },
  });

  const definirAttente = useCallback((valeur: Attente | null) => {
    attenteRef.current = valeur;
    setAttente(valeur);
  }, []);

  const arreterMinuteries = useCallback(() => {
    for (const minuterie of minuteries.current) {
      clearTimeout(minuterie);
    }
    minuteries.current = [];
  }, []);

  useEffect(() => arreterMinuteries, [arreterMinuteries]);

  const executer = useCallback(
    (cible: Attente) => {
      if (attenteRef.current?.ouvrage.id === cible.ouvrage.id) {
        definirAttente(null);
      }
      mutate(cible);
    },
    [definirAttente, mutate],
  );

  const programmer = useCallback(
    (ouvrage: Ouvrage) => {
      // Only one deletion waits at a time: a second request sends the first one right away.
      const precedente = attenteRef.current;
      arreterMinuteries();
      if (precedente !== null) {
        executer(precedente.retiree ? precedente : retirer(precedente));
      }
      const nouvelle: Attente = { ouvrage, retiree: false, instantane: [] };
      definirAttente(nouvelle);
      setEchec(null);
      setRefugeId(null);
      focusDansBarre.current = false;
      voisineId.current = null;
      setAnnonce(citer(ouvrage.titre, labels.supprime));
      minuteries.current = [
        setTimeout(() => definirAttente(retirer(nouvelle)), motion.quick),
        setTimeout(() => {
          const courante = attenteRef.current;
          if (courante !== null && courante.ouvrage.id === ouvrage.id) {
            if (focusDansBarre.current) {
              setRefugeId(voisineId.current ?? ouvrage.id);
            }
            executer(courante);
          }
        }, DELAI_ANNULATION_MS),
      ];
    },
    [arreterMinuteries, definirAttente, executer, retirer],
  );

  const annuler = useCallback(() => {
    const courante = attenteRef.current;
    if (courante === null) {
      return;
    }
    arreterMinuteries();
    restaurer(courante);
    definirAttente(null);
    setRefugeId(courante.ouvrage.id);
    setAnnonce(citer(courante.ouvrage.titre, labels.conserve));
  }, [arreterMinuteries, definirAttente, restaurer]);

  const oublierRefuge = useCallback(() => setRefugeId(null), []);

  const nommerVoisine = useCallback((id: string | null) => {
    voisineId.current = id;
  }, []);

  const surFocusBarre = useCallback((dedans: boolean) => {
    focusDansBarre.current = dedans;
  }, []);

  const fermerEchec = () => {
    if (echec !== null && focusDansBarre.current) {
      setRefugeId(echec.ouvrage.id);
    }
    setEchec(null);
    setAnnonce('');
  };

  const valeur = useMemo<Suppression>(
    () => ({
      programmer,
      annuler,
      enAttente: attente === null ? null : { ouvrage: attente.ouvrage, retiree: attente.retiree },
      refugeId,
      oublierRefuge,
      nommerVoisine,
    }),
    [programmer, annuler, attente, refugeId, oublierRefuge, nommerVoisine],
  );

  return (
    <SuppressionContext.Provider value={valeur}>
      <View style={styles.racine}>
        <View style={styles.contenu}>{children}</View>
        {attente !== null && (
          <UndoBar
            subject={attente.ouvrage.titre}
            message={labels.supprime}
            actionLabel={labels.annuler}
            onAction={annuler}
            onFocusChange={surFocusBarre}
            dureeMs={DELAI_ANNULATION_MS}
            autoFocus
          />
        )}
        {echec !== null && attente === null && (
          <UndoBar
            tone="danger"
            subject={echec.ouvrage.titre}
            message={labels.echec}
            actionLabel={labels.reessayer}
            onAction={() => programmer(echec.ouvrage)}
            onFocusChange={surFocusBarre}
            secondaryLabel={labels.fermer}
            onSecondary={fermerEchec}
          />
        )}
        {/* Screen readers only announce a live region that changes, so it stays mounted. */}
        <View role="status" aria-live="polite" style={styles.annonce}>
          <AppText variant="small">{annonce}</AppText>
        </View>
      </View>
    </SuppressionContext.Provider>
  );
}

export function useSuppression(): Suppression {
  const suppression = useContext(SuppressionContext);
  if (suppression === null) {
    throw new Error('useSuppression must be used inside a SuppressionProvider.');
  }
  return suppression;
}

const styles = StyleSheet.create({
  racine: { flex: 1 },
  contenu: { flex: 1 },
  annonce: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 },
});
