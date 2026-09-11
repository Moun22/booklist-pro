import { useEffect, useRef } from 'react';

export function useAutoFocus<T extends { focus: () => void }>(actif: boolean, apres?: () => void) {
  const cible = useRef<T>(null);

  useEffect(() => {
    if (actif) {
      cible.current?.focus();
      apres?.();
    }
  }, [actif, apres]);

  return cible;
}
