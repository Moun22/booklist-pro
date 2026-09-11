import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CadreOuvrage, type ModeOuvrage } from './CadreOuvrage';
import { CouvertureOuvrage } from './CouvertureOuvrage';
import { FicheErreur, FicheSquelette } from './FicheEtats';
import { useSuppression } from './SuppressionProvider';
import { useOuvrage } from './useOuvrage';
import { useRetoucheOuvrage } from './useRetoucheOuvrage';
import { AppText } from '@/components/AppText';
import { ConfirmInline } from '@/components/ConfirmInline';
import { FieldRow } from '@/components/FieldRow';
import { StarRow } from '@/components/StarRow';
import { TextButton } from '@/components/TextButton';
import { ToggleRow } from '@/components/ToggleRow';
import { LIMITES_OUVRAGE, type Ouvrage, type OuvrageRetouche } from '@/domain/ouvrage';
import {
  useEnrichissement,
  type Enrichissement,
} from '@/features/enrichissement/useEnrichissement';
import { messagePourErreur } from '@/features/erreurs/messages';
import type { Dictionnaire } from '@/features/i18n/fr';
import { useTraduction } from '@/features/i18n/useTraduction';
import { NotesOuvrage } from '@/features/notes/NotesOuvrage';
import { useEscape } from '@/hooks/useEscape';
import { space } from '@/theme/tokens';

type Props = {
  id: string;
  mode: ModeOuvrage;
  onFermer: () => void;
  onModifier: () => void;
};

// After « Garder », focus goes back to the button that asked the question.
type EtapeSuppression = 'repos' | 'question' | 'gardee';

export function FicheOuvrage({ id, mode, onFermer, onModifier }: Props) {
  const t = useTraduction();
  const fiche = useOuvrage(id);
  const retouche = useRetoucheOuvrage(id);
  const suppression = useSuppression();
  const [etape, setEtape] = useState<EtapeSuppression>('repos');
  const ouvrage = fiche.ouvrage;
  const editions = useEnrichissement(ouvrage?.titre ?? '');
  useEscape(onFermer, mode === 'volet');

  const supprimer = () => {
    if (ouvrage !== undefined) {
      suppression.programmer(ouvrage);
      onFermer();
    }
  };

  const retoucher = (calcul: (courant: Ouvrage) => OuvrageRetouche) => {
    if (ouvrage !== undefined && !retouche.isPending) {
      retouche.mutate({ retouche: calcul(ouvrage), version: ouvrage.version });
    }
  };
  const basculerLu = () => retoucher((courant) => ({ lu: !courant.lu }));
  const basculerCoupDeCoeur = () => retoucher((courant) => ({ favori: !courant.favori }));
  const noter = (note: number | null) => retoucher(() => ({ note }));

  return (
    <CadreOuvrage mode={mode} onFermer={onFermer}>
      {ouvrage !== undefined ? (
        <ScrollView contentContainerStyle={styles.contenu}>
          <CouvertureOuvrage ouvrage={ouvrage} />
          <FieldRow
            label={t.fiche.editeur}
            value={ouvrage.editeur.length > 0 ? ouvrage.editeur : t.fiche.sansEditeur}
            muted={ouvrage.editeur.length === 0}
          />
          <FieldRow label={t.fiche.annee} value={String(ouvrage.annee)} />
          <StarRow
            label={t.fiche.note}
            value={ouvrage.note}
            max={LIMITES_OUVRAGE.noteMax}
            valueLabel={
              ouvrage.note === null
                ? t.fiche.sansNote
                : `${ouvrage.note}/${LIMITES_OUVRAGE.noteMax}`
            }
            starLabel={(valeur) => t.fiche.etoile(valeur, LIMITES_OUVRAGE.noteMax)}
            removeLabel={t.fiche.retirerNote}
            onChange={noter}
            busy={retouche.isPending}
          />
          <ToggleRow
            label={t.fiche.coupDeCoeur}
            valueLabel={ouvrage.favori ? t.fiche.oui : t.fiche.non}
            checked={ouvrage.favori}
            onToggle={basculerCoupDeCoeur}
            busy={retouche.isPending}
            mark="heart"
          />
          <ToggleRow
            label={t.fiche.statut}
            valueLabel={ouvrage.lu ? t.fiche.lu : t.fiche.nonLu}
            checked={ouvrage.lu}
            onToggle={basculerLu}
            busy={retouche.isPending}
          />
          <FieldRow
            label={t.fiche.editions}
            value={libelleEditions(editions, t.fiche)}
            muted={editions.etat !== 'trouve'}
          />
          {retouche.isError && (
            <AppText variant="small" tone="danger" role="alert" style={styles.avertissement}>
              {t.fiche.modificationAnnulee} {messagePourErreur(retouche.error, t.erreurs).titre}
            </AppText>
          )}
          {etape === 'question' ? (
            <View style={styles.actions}>
              <ConfirmInline
                message={t.fiche.confirmation}
                confirmLabel={t.fiche.supprimer}
                cancelLabel={t.fiche.garder}
                onConfirm={supprimer}
                onCancel={() => setEtape('gardee')}
              />
            </View>
          ) : (
            <View style={[styles.actions, styles.rangee]}>
              <TextButton
                label={t.fiche.supprimer}
                icon="trash-2"
                tone="danger"
                autoFocus={etape === 'gardee'}
                onPress={() => setEtape('question')}
              />
              <TextButton label={t.fiche.modifier} icon="edit-2" tone="ink" onPress={onModifier} />
            </View>
          )}
          <NotesOuvrage livreId={ouvrage.id} />
        </ScrollView>
      ) : fiche.erreur !== null ? (
        <FicheErreur erreur={fiche.erreur} onReessayer={fiche.reessayer} />
      ) : (
        <FicheSquelette />
      )}
    </CadreOuvrage>
  );
}

function libelleEditions(editions: Enrichissement, m: Dictionnaire['fiche']): string {
  switch (editions.etat) {
    case 'trouve':
      return m.editionsTrouvees(editions.editions, editions.premiereAnnee);
    case 'aucune':
      return m.editionsAucune;
    case 'indisponible':
      return m.editionsIndisponible;
    case 'recherche':
    case 'inactif':
      return m.editionsRecherche;
  }
}

const styles = StyleSheet.create({
  contenu: { padding: space.lg, gap: space.sm },
  avertissement: { marginTop: space.md },
  actions: { marginTop: space.lg },
  rangee: { flexDirection: 'row', justifyContent: 'flex-end', gap: space.sm },
});
