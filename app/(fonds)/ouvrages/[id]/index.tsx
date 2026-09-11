import { useLocalSearchParams } from 'expo-router';

import { StateMessage } from '@/components/StateMessage';
import { FicheOuvrage } from '@/features/books/FicheOuvrage';
import { useTraduction } from '@/features/i18n/useTraduction';
import { useModeOuvrage } from '@/hooks/useModeOuvrage';
import { useNavigationOuvrages } from '@/hooks/useNavigationOuvrages';

export default function OuvrageScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const mode = useModeOuvrage();
  const navigation = useNavigationOuvrages();
  const t = useTraduction();

  if (typeof id !== 'string' || id.length === 0) {
    return (
      <StateMessage
        icon="alert-circle"
        title={t.ecran.introuvable}
        description={t.ecran.introuvableDetail}
      />
    );
  }

  return (
    <FicheOuvrage
      key={id}
      id={id}
      mode={mode}
      onFermer={navigation.retour}
      onModifier={() => navigation.modifier(id)}
    />
  );
}
