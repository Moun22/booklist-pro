import AsyncStorage from '@react-native-async-storage/async-storage';

// The only door to local storage. A storage that is full, corrupted or unavailable makes the
// preference fall back to its default: the application keeps working without it.
export const stockage = {
  async lire(cle: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(cle);
    } catch {
      return null;
    }
  },

  async ecrire(cle: string, valeur: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(cle, valeur);
      return true;
    } catch {
      return false;
    }
  },

  async effacer(cle: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(cle);
      return true;
    } catch {
      return false;
    }
  },
};
