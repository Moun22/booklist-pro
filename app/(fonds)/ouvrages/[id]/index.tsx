import { useLocalSearchParams } from 'expo-router';

import { StateMessage } from '@/components/StateMessage';
import { FicheOuvrage } from '@/features/books/FicheOuvrage';
import { useModeOuvrage } from '@/hooks/useModeOuvrage';
import { useNavigationOuvrages } from '@/hooks/useNavigationOuvrages';

const labels = {
  introuvable: 'Ouvrage introuvable',
  hint: "L'adresse ne désigne aucun ouvrage du fonds.",
};

export default function OuvrageScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mode = useModeOuvrage();
  const navigation = useNavigationOuvrages();

  if (typeof id !== 'string' || id.length === 0) {
    return (
      <StateMessage icon="alert-circle" title={labels.introuvable} description={labels.hint} />
    );
  }

  return (
    <FicheOuvrage
      id={id}
      mode={mode}
      onFermer={navigation.retour}
      onModifier={() => navigation.modifier(id)}
    />
  );
}
