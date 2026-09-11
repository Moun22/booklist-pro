import { StyleSheet, View } from 'react-native';

import { StateMessage } from '@/components/StateMessage';
import { FondsPane } from '@/features/books/FondsPane';
import { useTraduction } from '@/features/i18n/useTraduction';
import { useModeOuvrage } from '@/hooks/useModeOuvrage';
import { useNavigationOuvrages } from '@/hooks/useNavigationOuvrages';

export default function FondsScreen() {
  const mode = useModeOuvrage();
  const navigation = useNavigationOuvrages();
  const t = useTraduction();

  if (mode === 'volet') {
    return (
      <View style={styles.placeholder}>
        <StateMessage
          icon="book-open"
          title={t.ecran.aucunOuvert}
          description={t.ecran.aucunOuvertDetail}
        />
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
