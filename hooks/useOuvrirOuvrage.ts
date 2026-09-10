import { useRouter } from 'expo-router';
import { useCallback } from 'react';

export function useOuvrirOuvrage() {
  const router = useRouter();
  return useCallback(
    (id: string) => {
      router.push({ pathname: '/ouvrages/[id]', params: { id } });
    },
    [router],
  );
}
