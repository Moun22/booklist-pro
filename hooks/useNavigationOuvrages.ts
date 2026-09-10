import { useRouter } from 'expo-router';
import { useMemo } from 'react';

export function useNavigationOuvrages() {
  const router = useRouter();
  return useMemo(
    () => ({
      ouvrir: (id: string) => router.push(`/ouvrages/${id}`),
      afficherApresEnregistrement: (id: string) => router.replace(`/ouvrages/${id}`),
      ajouter: () => router.push('/ouvrages/nouveau'),
      modifier: (id: string) => router.push(`/ouvrages/${id}/modifier`),
      retour: () => {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace('/');
        }
      },
    }),
    [router],
  );
}
