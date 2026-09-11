import { useEtatServeur, type EtatServeur } from './useEtatServeur';
import { SyncMark, type SyncStatus } from '@/components/SyncMark';
import { useTraduction } from '@/features/i18n/useTraduction';

const STATUT: Record<EtatServeur, SyncStatus> = {
  inconnu: 'pending',
  joignable: 'online',
  injoignable: 'offline',
};

export function MarqueServeur() {
  const t = useTraduction();
  const etat = useEtatServeur();
  const label = {
    inconnu: t.chrome.verification,
    joignable: t.chrome.online,
    injoignable: t.chrome.offline,
  }[etat];
  return <SyncMark status={STATUT[etat]} label={label} />;
}
