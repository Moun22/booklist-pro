import '@/theme/global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SuppressionProvider } from '@/features/books/SuppressionProvider';
import { QueryProvider } from '@/features/query/QueryProvider';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SuppressionProvider>
          <ThemedStack />
        </SuppressionProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

function ThemedStack() {
  const { scheme, colors } = useTheme();
  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.page } }}
      />
    </>
  );
}
