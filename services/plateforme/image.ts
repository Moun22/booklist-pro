import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';

import { LARGEUR_COUVERTURE_MAX } from '@/domain/couverture';

const QUALITE_JPEG = 0.8;

// One door for "pick a picture": the file dialog on the web, the photo library on a phone.
// The picture always comes back resized and re-encoded, so a raw phone photo never leaves the device.
export async function choisirCouverture(): Promise<string | null> {
  const choix = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsMultipleSelection: false,
    quality: 1,
  });
  const image = choix.assets?.[0];
  if (choix.canceled || image === undefined) {
    return null;
  }
  return redimensionnerEnDataUrl(image.uri, image.width);
}

async function redimensionnerEnDataUrl(uri: string, largeur: number): Promise<string> {
  const contexte = ImageManipulator.manipulate(uri);
  if (largeur > LARGEUR_COUVERTURE_MAX) {
    contexte.resize({ width: LARGEUR_COUVERTURE_MAX });
  }
  const rendu = await contexte.renderAsync();
  const sortie = await rendu.saveAsync({
    format: SaveFormat.JPEG,
    compress: QUALITE_JPEG,
    base64: true,
  });
  if (sortie.base64 === undefined || sortie.base64 === null) {
    throw new Error("L'image n'a pas pu être encodée.");
  }
  return `data:image/jpeg;base64,${sortie.base64}`;
}
