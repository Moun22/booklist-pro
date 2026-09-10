import { Slot, Stack, useGlobalSearchParams } from 'expo-router';

import { FondsPane } from '@/features/books/FondsPane';
import { useModeOuvrage } from '@/hooks/useModeOuvrage';
import { useNavigationOuvrages } from '@/hooks/useNavigationOuvrages';
import { useTheme } from '@/theme/ThemeProvider';

export default function FondsLayout() {
  const { colors } = useTheme();
  const mode = useModeOuvrage();
  const { id } = useGlobalSearchParams<{ id?: string }>();
  const navigation = useNavigationOuvrages();

  if (mode === 'ecran') {
    return (
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.page } }}
      />
    );
  }

  return (
    <FondsPane
      selectionId={typeof id === 'string' ? id : null}
      onOuvrir={navigation.ouvrir}
      onAjouter={navigation.ajouter}
      detail={<Slot />}
    />
  );
}
