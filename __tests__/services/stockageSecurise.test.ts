import { afterEach, describe, expect, it, jest } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { stockageSecurise } from '@/services/stockageSecurise';

afterEach(async () => {
  jest.restoreAllMocks();
  await SecureStore.deleteItemAsync('secret');
  await AsyncStorage.clear();
});

describe('stockageSecurise', () => {
  it('keeps a secret in the keychain on a device', async () => {
    expect(await stockageSecurise.ecrire('secret', 'valeur')).toBe(true);

    expect(await stockageSecurise.lire('secret')).toBe('valeur');
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('secret', 'valeur');
    expect(await AsyncStorage.getItem('secret')).toBeNull();

    expect(await stockageSecurise.effacer('secret')).toBe(true);
    expect(await stockageSecurise.lire('secret')).toBeNull();
  });

  it('falls back to the ordinary storage in a browser, which has no keychain', async () => {
    jest.replaceProperty(Platform, 'OS', 'web');

    await stockageSecurise.ecrire('secret', 'valeur');

    expect(await AsyncStorage.getItem('secret')).toBe('valeur');
    expect(await stockageSecurise.lire('secret')).toBe('valeur');
  });

  it('answers nothing rather than failing when the keychain is unusable', async () => {
    jest.mocked(SecureStore.getItemAsync).mockRejectedValueOnce(new Error('keychain locked'));

    expect(await stockageSecurise.lire('secret')).toBeNull();
  });
});
