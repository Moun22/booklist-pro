import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useRetirerCouverture, useTeleverserCouverture } from './useCouverture';
import { AppText } from '@/components/AppText';
import { CoverImage } from '@/components/CoverImage';
import { TextButton } from '@/components/TextButton';
import type { Ouvrage } from '@/domain/ouvrage';
import { messagePourErreur } from '@/features/erreurs/messages';
import { useTraduction } from '@/features/i18n/useTraduction';
import { resoudreCouverture } from '@/services/api/couvertures';
import { choisirCouverture } from '@/services/plateforme/image';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

const LARGEUR = 80;
const HAUTEUR = 120;

type Props = {
  ouvrage: Ouvrage;
  lectureSeule?: boolean;
};

// The head of the fiche: the cover beside the title, then the row that replaces or restores it.
export function CouvertureOuvrage({ ouvrage, lectureSeule = false }: Props) {
  const { colors } = useTheme();
  const t = useTraduction();
  const televersement = useTeleverserCouverture(ouvrage.id);
  const retrait = useRetirerCouverture(ouvrage.id);
  const [choixEnCours, setChoixEnCours] = useState(false);
  const occupe = choixEnCours || televersement.isPending || retrait.isPending;
  const erreur = televersement.error ?? retrait.error;
  const televersee =
    ouvrage.couverture?.startsWith('/covers/') === true && !ouvrage.couverture.endsWith('.svg');

  const remplacer = async () => {
    setChoixEnCours(true);
    try {
      const image = await choisirCouverture();
      if (image !== null) {
        televersement.mutate({ image, version: ouvrage.version });
      }
    } finally {
      setChoixEnCours(false);
    }
  };

  return (
    <View style={styles.bloc}>
      <View style={styles.entete}>
        <CoverImage
          source={resoudreCouverture(ouvrage.couverture)}
          label={
            ouvrage.couverture === null ? t.fiche.sansCouverture : t.ligne.couverture(ouvrage.titre)
          }
          width={LARGEUR}
          height={HAUTEUR}
        />
        <View style={styles.identite}>
          <AppText variant="title">{ouvrage.titre}</AppText>
          <AppText variant="lead" tone="secondary" style={styles.auteur}>
            {ouvrage.auteur}
          </AppText>
        </View>
      </View>
      {!lectureSeule && (
        <View style={[styles.actions, { borderBottomColor: colors.rule }]}>
          <AppText variant="rubric" tone="secondary" style={styles.etiquette}>
            {t.fiche.couverture}
          </AppText>
          <View style={styles.boutons}>
            <TextButton
              label={occupe ? t.fiche.envoiCouverture : t.fiche.remplacerCouverture}
              icon="image"
              tone="ink"
              disabled={occupe}
              onPress={() => {
                void remplacer();
              }}
            />
            {televersee && (
              <TextButton
                label={t.fiche.couvertureOrigine}
                icon="rotate-ccw"
                tone="ink"
                disabled={occupe}
                onPress={() => retrait.mutate(ouvrage.version)}
              />
            )}
          </View>
        </View>
      )}
      {erreur !== null && erreur !== undefined && (
        <AppText variant="small" tone="danger" role="alert" style={styles.avertissement}>
          {t.fiche.couvertureRefusee} {messagePourErreur(erreur, t.erreurs).detail}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bloc: { gap: space.sm },
  entete: { flexDirection: 'row', gap: space.lg, alignItems: 'flex-start' },
  identite: { flex: 1, paddingTop: space.xs },
  auteur: { marginTop: space.xs },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: layout.touchTarget,
    marginTop: space.sm,
    borderBottomWidth: hairline,
  },
  etiquette: { width: layout.fieldLabel },
  // Pulled back so that the button labels start on the value column, after their icon.
  boutons: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginLeft: -space.xs },
  avertissement: { marginLeft: layout.fieldLabel + space.md },
});
