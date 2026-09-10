import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { StateMessage } from '@/components/StateMessage';
import { FondsPane } from '@/features/books/FondsPane';
import { useOuvrirOuvrage } from '@/hooks/useOuvrirOuvrage';
import { layout } from '@/theme/tokens';

const labels = {
  title: 'Aucun ouvrage ouvert',
  hint: 'Choisissez un ouvrage dans le fonds pour lire sa fiche et ses notes de lecture.',
};

export default function FondsScreen() {
  const { width } = useWindowDimensions();
  const ouvrir = useOuvrirOuvrage();

  if (width >= layout.twoPaneMin) {
    return (
      <View style={styles.placeholder}>
        <StateMessage icon="book-open" title={labels.title} description={labels.hint} />
      </View>
    );
  }

  return <FondsPane selectionId={null} onOuvrir={ouvrir} />;
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, justifyContent: 'center' },
});
