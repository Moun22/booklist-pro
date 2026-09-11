import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { FormField } from '@/components/FormField';
import { TextButton } from '@/components/TextButton';
import { creerIdentifiantsSchema } from '@/domain/session';
import { messagePourErreur } from '@/features/erreurs/messages';
import { useTraduction } from '@/features/i18n/useTraduction';
import { space } from '@/theme/tokens';

type Props = {
  onConnexion: (email: string, motDePasse: string) => Promise<void>;
};

type Erreurs = { email?: string; motDePasse?: string; globale?: string };

export function FormulaireConnexion({ onConnexion }: Props) {
  const t = useTraduction();
  const schema = useMemo(() => creerIdentifiantsSchema(t.connexion), [t]);
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoi, setEnvoi] = useState(false);

  const soumettre = async () => {
    const lecture = schema.safeParse({ email, motDePasse });
    if (!lecture.success) {
      const parChamp: Erreurs = {};
      for (const probleme of lecture.error.issues) {
        const champ = probleme.path[0];
        if (champ === 'email' || champ === 'motDePasse') {
          parChamp[champ] ??= probleme.message;
        }
      }
      setErreurs(parChamp);
      return;
    }
    setErreurs({});
    setEnvoi(true);
    try {
      await onConnexion(lecture.data.email, lecture.data.motDePasse);
    } catch (erreur) {
      const message = messagePourErreur(erreur, t.erreurs);
      setErreurs({ globale: `${message.titre}. ${message.detail}` });
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <View style={styles.formulaire}>
      <FormField
        label={t.connexion.email}
        placeholder={t.connexion.emailIndicatif}
        value={email}
        onChangeText={setEmail}
        error={erreurs.email}
        inputMode="email"
        autoCapitalize="none"
        autoComplete="email"
        autoFocus
      />
      <FormField
        label={t.connexion.motDePasse}
        placeholder={t.connexion.motDePasseIndicatif}
        value={motDePasse}
        onChangeText={setMotDePasse}
        error={erreurs.motDePasse}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="current-password"
        onSubmitEditing={() => {
          void soumettre();
        }}
      />
      {erreurs.globale !== undefined && (
        <AppText variant="small" tone="danger" role="alert" style={styles.globale}>
          {erreurs.globale}
        </AppText>
      )}
      <View style={styles.actions}>
        <TextButton
          label={envoi ? t.connexion.enCours : t.connexion.valider}
          icon="log-in"
          onPress={() => {
            void soumettre();
          }}
          disabled={envoi}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formulaire: { gap: space.sm },
  globale: { marginTop: space.md },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: space.lg },
});
