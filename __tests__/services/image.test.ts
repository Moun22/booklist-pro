import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { ImageManipulator } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

import { choisirCouverture } from '@/services/plateforme/image';

type Contexte = ReturnType<typeof ImageManipulator.manipulate>;

function contexteDeRendu(base64: string | null) {
  const resize = jest.fn();
  const saveAsync = jest.fn(async () => ({
    uri: 'file://sortie.jpg',
    width: 1,
    height: 1,
    base64,
  }));
  const renderAsync = jest.fn(async () => ({ saveAsync }));
  jest
    .mocked(ImageManipulator.manipulate)
    .mockReturnValue({ resize, renderAsync } as unknown as Contexte);
  return { resize, saveAsync };
}

function imageChoisie(width: number) {
  jest.mocked(ImagePicker.launchImageLibraryAsync).mockResolvedValue({
    canceled: false,
    assets: [{ uri: 'file://photo.jpg', width, height: width * 1.5 }],
  } as unknown as ImagePicker.ImagePickerResult);
}

afterEach(() => {
  jest.clearAllMocks();
});

describe('choisirCouverture', () => {
  it('answers nothing when the librarian closes the picker', async () => {
    jest
      .mocked(ImagePicker.launchImageLibraryAsync)
      .mockResolvedValue({ canceled: true, assets: null });

    await expect(choisirCouverture()).resolves.toBeNull();
    expect(ImageManipulator.manipulate).not.toHaveBeenCalled();
  });

  it('shrinks a phone photo to 600 px and re-encodes it as a JPEG data URL', async () => {
    imageChoisie(4000);
    const { resize, saveAsync } = contexteDeRendu('AAAA');

    await expect(choisirCouverture()).resolves.toBe('data:image/jpeg;base64,AAAA');

    expect(resize).toHaveBeenCalledWith({ width: 600 });
    expect(saveAsync).toHaveBeenCalledWith(
      expect.objectContaining({ format: 'jpeg', compress: 0.8, base64: true }),
    );
  });

  it('leaves a small picture at its size', async () => {
    imageChoisie(400);
    const { resize } = contexteDeRendu('BBBB');

    await expect(choisirCouverture()).resolves.toBe('data:image/jpeg;base64,BBBB');
    expect(resize).not.toHaveBeenCalled();
  });

  it('fails clearly when the picture cannot be encoded', async () => {
    imageChoisie(400);
    contexteDeRendu(null);

    await expect(choisirCouverture()).rejects.toThrow("L'image n'a pas pu être encodée.");
  });
});
