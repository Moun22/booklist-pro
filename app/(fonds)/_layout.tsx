import { Redirect, Slot, Stack, useGlobalSearchParams, usePathname } from 'expo-router';

import { useSession } from '@/features/auth/SessionProvider';
import { FondsPane } from '@/features/books/FondsPane';
import { useModeOuvrage } from '@/hooks/useModeOuvrage';
import { useNavigationOuvrages } from '@/hooks/useNavigationOuvrages';
import { useTheme } from '@/theme/ThemeProvider';

export default function FondsLayout() {
  const { colors } = useTheme();
  const mode = useModeOuvrage();
  const session = useSession();
  const { id } = useGlobalSearchParams<{ id?: string }>();
  const pathname = usePathname();
  // The global params keep the last id after a replace to the index, so the path decides.
  const ouvrageOuvert = pathname.startsWith('/ouvrages/');
  const navigation = useNavigationOuvrages();

  // Nothing is drawn until the stored session is read: no fonds flashing before a login screen.
  if (session.etat === 'chargement') {
    return null;
  }
  if (session.authRequise && session.etat === 'anonyme') {
    return <Redirect href={`/connexion?vers=${encodeURIComponent(pathname)}`} />;
  }

  if (mode === 'ecran') {
    return (
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.page } }}
      />
    );
  }

  return (
    <FondsPane
      selectionId={ouvrageOuvert && typeof id === 'string' ? id : null}
      onOuvrir={navigation.ouvrir}
      onAjouter={navigation.ajouter}
      detail={<Slot />}
    />
  );
}
