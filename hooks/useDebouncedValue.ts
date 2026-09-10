import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(valeur: T, delaiMs: number): T {
  const [retardee, setRetardee] = useState(valeur);

  useEffect(() => {
    const minuterie = setTimeout(() => setRetardee(valeur), delaiMs);
    return () => clearTimeout(minuterie);
  }, [valeur, delaiMs]);

  return retardee;
}
