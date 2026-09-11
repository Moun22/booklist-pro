import { afterEach, describe, expect, it, jest } from '@jest/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { stockage } from '@/services/stockage';

afterEach(async () => {
  jest.restoreAllMocks();
  await AsyncStorage.clear();
});

describe('stockage', () => {
  it('writes, reads back and erases a value', async () => {
    expect(await stockage.ecrire('cle', 'valeur')).toBe(true);
    expect(await stockage.lire('cle')).toBe('valeur');
    expect(await stockage.effacer('cle')).toBe(true);
    expect(await stockage.lire('cle')).toBeNull();
  });

  it('answers nothing rather than failing when the storage is unusable', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockRejectedValue(new Error('QuotaExceededError'));
    jest.spyOn(AsyncStorage, 'setItem').mockRejectedValue(new Error('QuotaExceededError'));

    expect(await stockage.lire('cle')).toBeNull();
    expect(await stockage.ecrire('cle', 'valeur')).toBe(false);
  });
});
