import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAjouterNote } from './useAjouterNote';
import { useNotesDeLecture } from './useNotesDeLecture';
import { useSupprimerNote } from './useSupprimerNote';
import { AppText } from '@/components/AppText';
import { NoteRow } from '@/components/NoteRow';
import { Skeleton } from '@/components/Skeleton';
import { StateMessage } from '@/components/StateMessage';
import { TextAreaField } from '@/components/TextAreaField';
import { TextButton } from '@/components/TextButton';
import { ErreurValidation } from '@/domain/erreurs';
import { formaterHorodatage } from '@/domain/horodatage';
import { contenuNoteSchema, LIMITES_NOTE_DE_LECTURE } from '@/domain/noteDeLecture';
import { messagePourErreur } from '@/features/erreurs/messages';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

const labels = {
  section: 'Notes de lecture',
  compte: (total: number) => (total === 1 ? '1 note' : `${total} notes`),
  nouvelle: 'Nouvelle note',
  indicatif: 'À qui le conseiller, et pourquoi',
  ajouter: 'Ajouter la note',
  ajoutEnCours: 'Ajout…',
  ajoutee: 'Note ajoutée',
  chargement: 'Chargement des notes',
  reessayer: 'Réessayer',
  vide: {
    titre: 'Aucune note de lecture',
    detail: 'La première note dit à qui conseiller cet ouvrage.',
  },
  supprimer: (horodatage: string) => `Supprimer la note du ${horodatage}`,
  question: 'Supprimer cette note ?',
  garder: 'Garder',
  confirmer: 'Supprimer',
  suppressionAnnulee: 'Suppression annulée :',
};

const LIGNES_SQUELETTE = 2;

// Where focus lands once a note has left the list: the next note, or the action that writes one.
type Refuge = { note: string } | { ajout: true } | null;

type Props = {
  livreId: string;
};

export function NotesOuvrage({ livreId }: Props) {
  const { colors } = useTheme();
  const lecture = useNotesDeLecture(livreId);
  const ajout = useAjouterNote(livreId);
  const suppression = useSupprimerNote(livreId);
  const [brouillon, setBrouillon] = useState('');
  const [erreurSaisie, setErreurSaisie] = useState<string | null>(null);
  const [ajoutee, setAjoutee] = useState(false);
  const [refuge, setRefuge] = useState<Refuge>(null);
  const oublierRefuge = () => setRefuge(null);

  const supprimer = (index: number) => {
    const voisine = lecture.notes[index + 1] ?? lecture.notes[index - 1];
    setRefuge(voisine === undefined ? { ajout: true } : { note: voisine.id });
    suppression.mutate(lecture.notes[index]?.id ?? '');
  };

  const saisir = (texte: string) => {
    setBrouillon(texte);
    setErreurSaisie(null);
    setAjoutee(false);
  };

  const ajouter = () => {
    const lu = contenuNoteSchema.safeParse(brouillon);
    if (!lu.success) {
      setErreurSaisie(lu.error.issues[0]?.message ?? null);
      return;
    }
    ajout.mutate(lu.data, {
      onSuccess: () => {
        setBrouillon('');
        setAjoutee(true);
      },
      onError: (erreur) => {
        const parChamp = erreur instanceof ErreurValidation ? erreur.champs.contenu : undefined;
        setErreurSaisie(parChamp ?? messagePourErreur(erreur).titre);
      },
    });
  };

  return (
    <View style={styles.section}>
      <View style={[styles.entete, { borderBottomColor: colors.rule }]}>
        <AppText variant="bodyStrong">{labels.section}</AppText>
        {!lecture.chargement && lecture.erreur === null && (
          <AppText variant="figure" tone="secondary">
            {labels.compte(lecture.notes.length)}
          </AppText>
        )}
      </View>
      <TextAreaField
        label={labels.nouvelle}
        placeholder={labels.indicatif}
        value={brouillon}
        onChangeText={saisir}
        maxLength={LIMITES_NOTE_DE_LECTURE.contenuMax}
        error={erreurSaisie ?? undefined}
      />
      <View style={styles.actions}>
        {ajoutee && (
          <AppText variant="small" tone="secondary" role="status">
            {labels.ajoutee}
          </AppText>
        )}
        <TextButton
          label={ajout.isPending ? labels.ajoutEnCours : labels.ajouter}
          icon="plus"
          onPress={ajouter}
          disabled={ajout.isPending}
          autoFocus={refuge !== null && 'ajout' in refuge}
          onAutoFocus={oublierRefuge}
        />
      </View>
      {lecture.chargement ? (
        <SqueletteNotes />
      ) : lecture.erreur !== null ? (
        <StateMessage
          icon="alert-circle"
          tone="danger"
          title={messagePourErreur(lecture.erreur).titre}
          description={messagePourErreur(lecture.erreur).detail}
          action={{ label: labels.reessayer, icon: 'refresh-cw', onPress: lecture.reessayer }}
        />
      ) : lecture.notes.length === 0 ? (
        <StateMessage icon="edit-3" title={labels.vide.titre} description={labels.vide.detail} />
      ) : (
        <View
          role="list"
          aria-label={labels.section}
          style={[styles.liste, { borderTopColor: colors.rule }]}
        >
          {lecture.notes.map((note, index) => {
            const horodatage = formaterHorodatage(note.createdAt);
            return (
              <NoteRow
                key={note.id}
                timestamp={horodatage}
                content={note.contenu}
                deleteLabel={labels.supprimer(horodatage)}
                question={labels.question}
                confirmLabel={labels.confirmer}
                cancelLabel={labels.garder}
                onDelete={() => supprimer(index)}
                autoFocus={refuge !== null && 'note' in refuge && refuge.note === note.id}
                onAutoFocus={oublierRefuge}
              />
            );
          })}
        </View>
      )}
      {suppression.isError && (
        <AppText variant="small" tone="danger" role="alert" style={styles.avertissement}>
          {labels.suppressionAnnulee} {messagePourErreur(suppression.error).titre}
        </AppText>
      )}
    </View>
  );
}

function SqueletteNotes() {
  return (
    <View aria-busy aria-label={labels.chargement} role="progressbar" style={styles.squelette}>
      {Array.from({ length: LIGNES_SQUELETTE }, (_, index) => (
        <View key={index} style={styles.ligneSquelette}>
          <Skeleton width={120} height={10} />
          <Skeleton width="85%" height={10} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: space.xl, gap: space.sm },
  entete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: layout.touchTarget,
    borderBottomWidth: hairline,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: space.md,
  },
  liste: { borderTopWidth: hairline },
  avertissement: { marginTop: space.xs },
  squelette: { gap: space.md, paddingVertical: space.md },
  ligneSquelette: { gap: space.sm },
});
