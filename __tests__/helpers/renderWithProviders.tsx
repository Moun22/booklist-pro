import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';

import { SuppressionProvider } from '@/features/books/SuppressionProvider';
import { ThemeProvider } from '@/theme/ThemeProvider';

export function creerClientDeTest() {
  return new QueryClient({
    // Infinite gcTime keeps the cache from scheduling five-minute timers that outlive a test.
    defaultOptions: {
      queries: { retry: false, gcTime: Infinity },
      mutations: { retry: false, gcTime: Infinity },
    },
  });
}

export function creerWrapper(client: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <ThemeProvider>
        <QueryClientProvider client={client}>
          <SuppressionProvider>{children}</SuppressionProvider>
        </QueryClientProvider>
      </ThemeProvider>
    );
  };
}

export function renderWithProviders(element: ReactElement, client = creerClientDeTest()) {
  return render(element, { wrapper: creerWrapper(client) });
}
