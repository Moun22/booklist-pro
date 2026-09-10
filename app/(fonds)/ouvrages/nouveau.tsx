import { ScrollView, StyleSheet } from 'react-native';

import { AppText } from '@/components/AppText';
import { CadreOuvrage } from '@/features/books/CadreOuvrage';
import { FormulaireOuvrage } from '@/features/books/FormulaireOuvrage';
import { versValide } from '@/features/books/formulaire';
import { useCreerOuvrage } from '@/features/books/useEnregistrerOuvrage';
import { useEscape } from '@/hooks/useEscape';
import { useModeOuvrage } from '@/hooks/useModeOuvrage';
import { useNavigationOuvrages } from '@/hooks/useNavigationOuvrages';
import { space } from '@/theme/tokens';

const labels = {
  titre: 'Nouvel ouvrage',
};

export default function NouvelOuvrageScreen() {
  const mode = useModeOuvrage();
  const navigation = useNavigationOuvrages();
  const creer = useCreerOuvrage();
  useEscape(navigation.retour, mode === 'volet');

  return (
    <CadreOuvrage mode={mode} onFermer={navigation.retour}>
      <ScrollView contentContainerStyle={styles.contenu} keyboardShouldPersistTaps="handled">
        <AppText variant="title" style={styles.titre}>
          {labels.titre}
        </AppText>
        <FormulaireOuvrage
          onSoumettre={async (valeurs) => {
            const ouvrage = await creer.mutateAsync(versValide(valeurs));
            navigation.afficherApresEnregistrement(ouvrage.id);
          }}
          onAnnuler={navigation.retour}
        />
      </ScrollView>
    </CadreOuvrage>
  );
}

const styles = StyleSheet.create({
  contenu: { padding: space.lg },
  titre: { marginBottom: space.lg },
});
