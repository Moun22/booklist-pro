import { ScrollView, StyleSheet, View } from 'react-native';

import { CadreOuvrage, type ModeOuvrage } from './CadreOuvrage';
import { useOuvrage } from './useOuvrage';
import { useRetoucheOuvrage } from './useRetoucheOuvrage';
import { AppText } from '@/components/AppText';
import { FieldRow } from '@/components/FieldRow';
import { Skeleton } from '@/components/Skeleton';
import { StateMessage } from '@/components/StateMessage';
import { TextButton } from '@/components/TextButton';
import { ToggleRow } from '@/components/ToggleRow';
import { messagePourErreur } from '@/features/erreurs/messages';
import { useEscape } from '@/hooks/useEscape';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

const labels = {
  chargement: 'Chargement de la fiche',
  editeur: 'Éditeur',
  annee: 'Année',
  note: 'Note',
  sansNote: 'Sans note',
  sansEditeur: 'Éditeur inconnu',
  coupDeCoeur: 'Coup de coeur',
  oui: 'Oui',
  non: 'Non',
  statut: 'Lecture',
  lu: 'Lu',
  nonLu: 'Non lu',
  modifier: 'Modifier',
  reessayer: 'Réessayer',
  modificationAnnulee: 'Modification annulée :',
};

const NOTE_MAX = 5;
const LIGNES_SQUELETTE = 5;

type Props = {
  id: string;
  mode: ModeOuvrage;
  onFermer: () => void;
  onModifier: () => void;
};

export function FicheOuvrage({ id, mode, onFermer, onModifier }: Props) {
  const fiche = useOuvrage(id);
  const retouche = useRetoucheOuvrage(id);
  const ouvrage = fiche.ouvrage;
  useEscape(onFermer, mode === 'volet');

  const basculerLu = () => {
    if (ouvrage !== undefined && !retouche.isPending) {
      retouche.mutate({ retouche: { lu: !ouvrage.lu }, version: ouvrage.version });
    }
  };

  return (
    <CadreOuvrage mode={mode} onFermer={onFermer}>
      {ouvrage !== undefined ? (
        <ScrollView contentContainerStyle={styles.contenu}>
          <AppText variant="title">{ouvrage.titre}</AppText>
          <AppText variant="lead" tone="secondary" style={styles.auteur}>
            {ouvrage.auteur}
          </AppText>
          <FieldRow
            label={labels.editeur}
            value={ouvrage.editeur.length > 0 ? ouvrage.editeur : labels.sansEditeur}
            muted={ouvrage.editeur.length === 0}
          />
          <FieldRow label={labels.annee} value={String(ouvrage.annee)} />
          <FieldRow
            label={labels.note}
            value={ouvrage.note === null ? labels.sansNote : `${ouvrage.note}/${NOTE_MAX}`}
            muted={ouvrage.note === null}
          />
          <FieldRow
            label={labels.coupDeCoeur}
            value={ouvrage.favori ? labels.oui : labels.non}
            icon={ouvrage.favori ? 'heart' : undefined}
          />
          <ToggleRow
            label={labels.statut}
            valueLabel={ouvrage.lu ? labels.lu : labels.nonLu}
            checked={ouvrage.lu}
            onToggle={basculerLu}
            busy={retouche.isPending}
          />
          {retouche.isError && (
            <AppText variant="small" tone="danger" role="alert" style={styles.avertissement}>
              {labels.modificationAnnulee} {messagePourErreur(retouche.error).titre}
            </AppText>
          )}
          <View style={styles.actions}>
            <TextButton label={labels.modifier} icon="edit-2" tone="ink" onPress={onModifier} />
          </View>
        </ScrollView>
      ) : fiche.erreur !== null ? (
        <EtatErreur erreur={fiche.erreur} onReessayer={fiche.reessayer} />
      ) : (
        <FicheSquelette />
      )}
    </CadreOuvrage>
  );
}

function EtatErreur({ erreur, onReessayer }: { erreur: unknown; onReessayer: () => void }) {
  const message = messagePourErreur(erreur);
  return (
    <StateMessage
      icon="alert-circle"
      tone="danger"
      title={message.titre}
      description={message.detail}
      action={{ label: labels.reessayer, icon: 'refresh-cw', onPress: onReessayer }}
    />
  );
}

function FicheSquelette() {
  const { colors } = useTheme();
  return (
    <View style={styles.contenu} aria-busy aria-label={labels.chargement} role="progressbar">
      <Skeleton width="70%" height={16} />
      <View style={styles.auteur}>
        <Skeleton width="45%" height={12} />
      </View>
      {Array.from({ length: LIGNES_SQUELETTE }, (_, index) => (
        <View key={index} style={[styles.ligneSquelette, { borderBottomColor: colors.rule }]}>
          <View style={styles.etiquetteSquelette}>
            <Skeleton width={64} height={10} />
          </View>
          <Skeleton width="40%" height={10} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenu: { padding: space.lg, gap: space.sm },
  auteur: { marginBottom: space.md },
  avertissement: { marginTop: space.md },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: space.lg },
  ligneSquelette: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: layout.touchTarget,
    paddingVertical: space.sm,
    borderBottomWidth: hairline,
  },
  etiquetteSquelette: { width: layout.fieldLabel },
});
