import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

type Poste = { courant: () => void };

// Only the most recently mounted handler answers, so a menu opened over a volet closes alone.
const pile: Poste[] = [];

function surTouche(evenement: KeyboardEvent) {
  if (evenement.key === 'Escape') {
    pile[pile.length - 1]?.courant();
  }
}

export function useEscape(onEscape: () => void, actif = true) {
  const poste = useRef<Poste>({ courant: onEscape });

  useEffect(() => {
    poste.current.courant = onEscape;
  }, [onEscape]);

  useEffect(() => {
    if (!actif || Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }
    const inscrit = poste.current;
    pile.push(inscrit);
    if (pile.length === 1) {
      document.addEventListener('keydown', surTouche);
    }
    return () => {
      pile.splice(pile.lastIndexOf(inscrit), 1);
      if (pile.length === 0) {
        document.removeEventListener('keydown', surTouche);
      }
    };
  }, [actif]);
}
