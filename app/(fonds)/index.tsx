import { StyleSheet, View } from 'react-native';

import { StateMessage } from '@/components/StateMessage';
import { FondsPane } from '@/features/books/FondsPane';
import { useModeOuvrage } from '@/hooks/useModeOuvrage';
import { useNavigationOuvrages } from '@/hooks/useNavigationOuvrages';

const labels = {
  title: 'Aucun ouvrage ouvert',
  hint: 'Choisissez un ouvrage dans le fonds pour lire sa fiche et ses notes de lecture.',
};

export default function FondsScreen() {
  const mode = useModeOuvrage();
  const navigation = useNavigationOuvrages();

  if (mode === 'volet') {
    return (
      <View style={styles.placeholder}>
        <StateMessage icon="book-open" title={labels.title} description={labels.hint} />
      </View>
    );
  }

  return (
    <FondsPane selectionId={null} onOuvrir={navigation.ouvrir} onAjouter={navigation.ajouter} />
  );
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, justifyContent: 'center' },
});
