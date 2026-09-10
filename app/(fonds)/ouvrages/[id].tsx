import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';

import { StateMessage } from '@/components/StateMessage';
import { FicheOuvrage } from '@/features/books/FicheOuvrage';
import { layout } from '@/theme/tokens';

const labels = {
  introuvable: 'Ouvrage introuvable',
  hint: "L'adresse ne désigne aucun ouvrage du fonds.",
};

export default function OuvrageScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const router = useRouter();

  const fermer = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }, [router]);

  if (typeof id !== 'string' || id.length === 0) {
    return (
      <StateMessage icon="alert-circle" title={labels.introuvable} description={labels.hint} />
    );
  }

  return (
    <FicheOuvrage id={id} mode={width >= layout.twoPaneMin ? 'volet' : 'ecran'} onFermer={fermer} />
  );
}
