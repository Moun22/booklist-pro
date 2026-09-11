import '@/theme/global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { SessionProvider } from '@/features/auth/SessionProvider';
import { SuppressionProvider } from '@/features/books/SuppressionProvider';
import { PreferencesProvider } from '@/features/preferences/PreferencesProvider';
import { QueryProvider } from '@/features/query/QueryProvider';
import { useTheme } from '@/theme/ThemeProvider';

export default function RootLayout() {
  return (
    <PreferencesProvider>
      <QueryProvider>
        <SessionProvider sonderServeur>
          <SuppressionProvider>
            <ThemedStack />
          </SuppressionProvider>
        </SessionProvider>
      </QueryProvider>
    </PreferencesProvider>
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
