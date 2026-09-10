import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { CHAMPS_FORMULAIRE, repartirErreur } from './erreursFormulaire';
import { SAISIE_VIDE, versSaisie } from './formulaire';
import { AppText } from '@/components/AppText';
import { FormField } from '@/components/FormField';
import { TextButton } from '@/components/TextButton';
import { ToggleRow } from '@/components/ToggleRow';
import { ErreurConflit } from '@/domain/erreurs';
import {
  ouvrageFormulaireSchema,
  type Ouvrage,
  type OuvrageFormulaire,
  type SaisieFormulaire,
} from '@/domain/ouvrage';
import { space } from '@/theme/tokens';

const labels = {
  titre: 'Titre',
  auteur: 'Auteur',
  editeur: 'Éditeur',
  annee: 'Année',
  titreIndicatif: "Titre de l'ouvrage",
  auteurIndicatif: 'Prénom Nom',
  editeurIndicatif: 'Facultatif',
  anneeIndicatif: '1965',
  lecture: 'Lecture',
  lu: 'Lu',
  nonLu: 'Non lu',
  annuler: 'Annuler',
  enregistrer: 'Enregistrer',
  enregistrement: 'Enregistrement…',
  reprendreServeur: 'Reprendre la version du serveur',
};

type Props = {
  valeursInitiales?: SaisieFormulaire;
  onSoumettre: (valeurs: OuvrageFormulaire) => Promise<void>;
  onAnnuler: () => void;
};

export function FormulaireOuvrage({
  valeursInitiales = SAISIE_VIDE,
  onSoumettre,
  onAnnuler,
}: Props) {
  const { control, handleSubmit, setError, reset, formState } = useForm<
    SaisieFormulaire,
    unknown,
    OuvrageFormulaire
  >({
    resolver: zodResolver(ouvrageFormulaireSchema),
    defaultValues: valeursInitiales,
    mode: 'onBlur',
  });
  const [globale, setGlobale] = useState<string | null>(null);
  const [conflit, setConflit] = useState<Ouvrage | null>(null);

  const soumettre = handleSubmit(async (valeurs) => {
    setGlobale(null);
    setConflit(null);
    try {
      await onSoumettre(valeurs);
    } catch (erreur) {
      if (erreur instanceof ErreurConflit) {
        setConflit(erreur.serveur);
      }
      const reparties = repartirErreur(erreur);
      for (const champ of CHAMPS_FORMULAIRE) {
        const message = reparties.parChamp[champ];
        if (message !== undefined) {
          setError(champ, { type: 'server', message });
        }
      }
      setGlobale(reparties.globale);
    }
  });

  const reprendreServeur = () => {
    if (conflit !== null) {
      reset(versSaisie(conflit));
      setConflit(null);
      setGlobale(null);
    }
  };

  return (
    <View style={styles.formulaire}>
      <Controller
        control={control}
        name="titre"
        render={({ field, fieldState }) => (
          <FormField
            label={labels.titre}
            placeholder={labels.titreIndicatif}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            autoFocus
            autoCapitalize="sentences"
          />
        )}
      />
      <Controller
        control={control}
        name="auteur"
        render={({ field, fieldState }) => (
          <FormField
            label={labels.auteur}
            placeholder={labels.auteurIndicatif}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            autoCapitalize="words"
          />
        )}
      />
      <Controller
        control={control}
        name="editeur"
        render={({ field, fieldState }) => (
          <FormField
            label={labels.editeur}
            placeholder={labels.editeurIndicatif}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            autoCapitalize="words"
          />
        )}
      />
      <Controller
        control={control}
        name="annee"
        render={({ field, fieldState }) => (
          <FormField
            label={labels.annee}
            placeholder={labels.anneeIndicatif}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
            inputMode="numeric"
          />
        )}
      />
      <Controller
        control={control}
        name="lu"
        render={({ field }) => (
          <ToggleRow
            label={labels.lecture}
            valueLabel={field.value ? labels.lu : labels.nonLu}
            checked={field.value}
            onToggle={() => field.onChange(!field.value)}
          />
        )}
      />
      {globale !== null && (
        <AppText variant="small" tone="danger" role="alert" style={styles.globale}>
          {globale}
        </AppText>
      )}
      {conflit !== null && (
        <View style={styles.reprise}>
          <TextButton
            label={labels.reprendreServeur}
            icon="refresh-cw"
            tone="ink"
            onPress={reprendreServeur}
          />
        </View>
      )}
      <View style={styles.actions}>
        <TextButton label={labels.annuler} tone="ink" onPress={onAnnuler} />
        <TextButton
          label={formState.isSubmitting ? labels.enregistrement : labels.enregistrer}
          icon="check"
          onPress={() => {
            void soumettre();
          }}
          disabled={formState.isSubmitting}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formulaire: { gap: space.sm },
  globale: { marginTop: space.md },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: space.sm,
    marginTop: space.lg,
  },
  reprise: { alignSelf: 'flex-start', marginLeft: -space.md },
});
