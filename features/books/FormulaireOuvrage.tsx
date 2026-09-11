import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
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
  creerOuvrageFormulaireSchema,
  type Ouvrage,
  type OuvrageFormulaire,
  type SaisieFormulaire,
} from '@/domain/ouvrage';
import { useTraduction } from '@/features/i18n/useTraduction';
import { space } from '@/theme/tokens';

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
  const t = useTraduction();
  const schema = useMemo(() => creerOuvrageFormulaireSchema(t.validation), [t]);
  const { control, handleSubmit, setError, reset, formState } = useForm<
    SaisieFormulaire,
    unknown,
    OuvrageFormulaire
  >({
    resolver: zodResolver(schema),
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
      const reparties = repartirErreur(erreur, t.erreurs);
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
            label={t.formulaire.titre}
            placeholder={t.formulaire.titreIndicatif}
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
            label={t.formulaire.auteur}
            placeholder={t.formulaire.auteurIndicatif}
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
            label={t.formulaire.editeur}
            placeholder={t.formulaire.editeurIndicatif}
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
            label={t.formulaire.annee}
            placeholder={t.formulaire.anneeIndicatif}
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
            label={t.formulaire.lecture}
            valueLabel={field.value ? t.formulaire.lu : t.formulaire.nonLu}
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
            label={t.formulaire.reprendreServeur}
            icon="refresh-cw"
            tone="ink"
            onPress={reprendreServeur}
          />
        </View>
      )}
      <View style={styles.actions}>
        <TextButton label={t.formulaire.annuler} tone="ink" onPress={onAnnuler} />
        <TextButton
          label={formState.isSubmitting ? t.formulaire.enregistrement : t.formulaire.enregistrer}
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
