import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

import { AppText } from '@/components/AppText';
import { StateMessage } from '@/components/StateMessage';
import { CadreOuvrage } from '@/features/books/CadreOuvrage';
import { FormulaireOuvrage } from '@/features/books/FormulaireOuvrage';
import { versSaisie, versValide } from '@/features/books/formulaire';
import { useRemplacerOuvrage } from '@/features/books/useEnregistrerOuvrage';
import { useOuvrage } from '@/features/books/useOuvrage';
import { messagePourErreur } from '@/features/erreurs/messages';
import { useTraduction } from '@/features/i18n/useTraduction';
import { useEscape } from '@/hooks/useEscape';
import { useModeOuvrage } from '@/hooks/useModeOuvrage';
import { useNavigationOuvrages } from '@/hooks/useNavigationOuvrages';
import { space } from '@/theme/tokens';

export default function ModifierOuvrageScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const ouvrageId = typeof id === 'string' ? id : '';
  const mode = useModeOuvrage();
  const navigation = useNavigationOuvrages();
  const t = useTraduction();
  const fiche = useOuvrage(ouvrageId);
  const remplacer = useRemplacerOuvrage(ouvrageId);
  const ouvrage = fiche.ouvrage;
  useEscape(navigation.retour, mode === 'volet');

  if (ouvrageId.length === 0) {
    return (
      <StateMessage
        icon="alert-circle"
        title={t.ecran.introuvable}
        description={t.ecran.introuvableDetail}
      />
    );
  }

  return (
    <CadreOuvrage mode={mode} onFermer={navigation.retour}>
      {ouvrage !== undefined ? (
        <ScrollView contentContainerStyle={styles.contenu} keyboardShouldPersistTaps="handled">
          <AppText variant="title" style={styles.titre}>
            {t.ecran.modifierOuvrage}
          </AppText>
          <FormulaireOuvrage
            valeursInitiales={versSaisie(ouvrage)}
            onSoumettre={async (valeurs) => {
              const enregistre = await remplacer.mutateAsync({
                saisie: versValide(valeurs, ouvrage),
                version: ouvrage.version,
              });
              navigation.afficherApresEnregistrement(enregistre.id);
            }}
            onAnnuler={navigation.retour}
          />
        </ScrollView>
      ) : fiche.erreur !== null ? (
        <StateMessage
          icon="alert-circle"
          tone="danger"
          title={messagePourErreur(fiche.erreur, t.erreurs).titre}
          description={messagePourErreur(fiche.erreur, t.erreurs).detail}
          action={{ label: t.fiche.reessayer, icon: 'refresh-cw', onPress: fiche.reessayer }}
        />
      ) : null}
    </CadreOuvrage>
  );
}

const styles = StyleSheet.create({
  contenu: { padding: space.lg },
  titre: { marginBottom: space.lg },
});
