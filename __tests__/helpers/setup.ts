import { jest } from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () =>
  jest.requireActual('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// The keychain has no test double of its own: a map plays it, and each test may clear it.
jest.mock('expo-secure-store', () => {
  const memoire = new Map<string, string>();
  return {
    getItemAsync: jest.fn((cle: string) => Promise.resolve(memoire.get(cle) ?? null)),
    setItemAsync: jest.fn((cle: string, valeur: string) => {
      memoire.set(cle, valeur);
      return Promise.resolve();
    }),
    deleteItemAsync: jest.fn((cle: string) => {
      memoire.delete(cle);
      return Promise.resolve();
    }),
  };
});

// The picker and the manipulator open native dialogs: tests hand them a stub and drive the rest.
jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ canceled: true, assets: null })),
}));
jest.mock('expo-image-manipulator', () => ({
  SaveFormat: { JPEG: 'jpeg' },
  ImageManipulator: { manipulate: jest.fn() },
}));
