import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

import { creerQueryClient } from './creerQueryClient';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(creerQueryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
