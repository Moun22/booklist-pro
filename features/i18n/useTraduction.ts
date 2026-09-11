import type { Dictionnaire } from './fr';
import { usePreferences } from '@/features/preferences/PreferencesProvider';

export function useTraduction(): Dictionnaire {
  return usePreferences().dictionnaire;
}
