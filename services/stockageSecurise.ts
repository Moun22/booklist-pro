import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { stockage } from './stockage';

// Secrets go to the platform keychain. A browser has none: there, the secret lives in the same
// storage as the preferences, readable by any script of the origin. Accepted for this evaluation
// and documented in the README; the abstraction is what lets a real answer replace it later.
export const stockageSecurise = {
  async lire(cle: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return stockage.lire(cle);
    }
    try {
      return await SecureStore.getItemAsync(cle);
    } catch {
      return null;
    }
  },

  async ecrire(cle: string, valeur: string): Promise<boolean> {
    if (Platform.OS === 'web') {
      return stockage.ecrire(cle, valeur);
    }
    try {
      await SecureStore.setItemAsync(cle, valeur);
      return true;
    } catch {
      return false;
    }
  },

  async effacer(cle: string): Promise<boolean> {
    if (Platform.OS === 'web') {
      return stockage.effacer(cle);
    }
    try {
      await SecureStore.deleteItemAsync(cle);
      return true;
    } catch {
      return false;
    }
  },
};
