import { useEffect } from 'react';
import { Platform } from 'react-native';

export function useEscape(onEscape: () => void, actif = true) {
  useEffect(() => {
    if (!actif || Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }
    const surTouche = (evenement: KeyboardEvent) => {
      if (evenement.key === 'Escape') {
        onEscape();
      }
    };
    document.addEventListener('keydown', surTouche);
    return () => document.removeEventListener('keydown', surTouche);
  }, [onEscape, actif]);
}
