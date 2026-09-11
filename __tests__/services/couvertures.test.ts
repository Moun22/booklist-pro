import { afterEach, describe, expect, it, jest } from '@jest/globals';

import { ouvrageExemple, reponseJson } from '../helpers/fixtures';
import {
  resoudreCouverture,
  retirerCouverture,
  televerserCouverture,
} from '@/services/api/couvertures';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('resoudreCouverture', () => {
  it('prefixes a relative path with the API base URL', () => {
    expect(resoudreCouverture('/covers/abc.svg')).toEqual({
      uri: 'http://localhost:3000/covers/abc.svg',
    });
    expect(resoudreCouverture('covers/abc.svg')).toEqual({
      uri: 'http://localhost:3000/covers/abc.svg',
    });
  });

  it('leaves an absolute URL untouched', () => {
    expect(resoudreCouverture('https://covers.openlibrary.org/b/id/1-M.jpg')).toEqual({
      uri: 'https://covers.openlibrary.org/b/id/1-M.jpg',
    });
  });

  it('gives the stand-in for an absent cover', () => {
    expect(resoudreCouverture(null)).toEqual({ repli: true });
    expect(resoudreCouverture('   ')).toEqual({ repli: true });
  });
});

describe('services/api/couvertures', () => {
  it('posts the image as a data URL guarded by If-Match', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson({ ...ouvrageExemple, couverture: '/covers/x.jpg' }));

    const ouvrage = await televerserCouverture(ouvrageExemple.id, 'data:image/jpeg;base64,AAAA', 3);

    expect(ouvrage.couverture).toBe('/covers/x.jpg');
    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}/cover`,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ image: 'data:image/jpeg;base64,AAAA' }),
        headers: expect.objectContaining({ 'If-Match': '3' }),
      }),
    );
  });

  it('asks the server to restore the original cover', async () => {
    const transport = jest
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(reponseJson(ouvrageExemple));

    await retirerCouverture(ouvrageExemple.id, 4);

    expect(transport).toHaveBeenCalledWith(
      `http://localhost:3000/books/${ouvrageExemple.id}/cover`,
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({ 'If-Match': '4' }),
      }),
    );
  });
});
