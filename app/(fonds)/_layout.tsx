import { Slot, Stack, useGlobalSearchParams } from 'expo-router';
import { useWindowDimensions } from 'react-native';

import { FondsPane } from '@/features/books/FondsPane';
import { useOuvrirOuvrage } from '@/hooks/useOuvrirOuvrage';
import { useTheme } from '@/theme/ThemeProvider';
import { layout } from '@/theme/tokens';

export default function FondsLayout() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { id } = useGlobalSearchParams<{ id?: string }>();
  const ouvrir = useOuvrirOuvrage();

  if (width < layout.twoPaneMin) {
    return (
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.page } }}
      />
    );
  }

  return (
    <FondsPane
      selectionId={typeof id === 'string' ? id : null}
      onOuvrir={ouvrir}
      detail={<Slot />}
    />
  );
}
