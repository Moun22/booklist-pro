import { StyleSheet, View } from 'react-native';

import { Skeleton } from '@/components/Skeleton';
import { StateMessage } from '@/components/StateMessage';
import { messagePourErreur } from '@/features/erreurs/messages';
import { useTraduction } from '@/features/i18n/useTraduction';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

const LIGNES_SQUELETTE = 5;

export function FicheErreur({ erreur, onReessayer }: { erreur: unknown; onReessayer: () => void }) {
  const t = useTraduction();
  const message = messagePourErreur(erreur, t.erreurs);
  return (
    <StateMessage
      icon="alert-circle"
      tone="danger"
      title={message.titre}
      description={message.detail}
      action={{ label: t.fiche.reessayer, icon: 'refresh-cw', onPress: onReessayer }}
    />
  );
}

export function FicheSquelette() {
  const { colors } = useTheme();
  const t = useTraduction();
  return (
    <View style={styles.contenu} aria-busy aria-label={t.fiche.chargement} role="progressbar">
      <Skeleton width="70%" height={16} />
      <View style={styles.auteur}>
        <Skeleton width="45%" height={12} />
      </View>
      {Array.from({ length: LIGNES_SQUELETTE }, (_, index) => (
        <View key={index} style={[styles.ligneSquelette, { borderBottomColor: colors.rule }]}>
          <View style={styles.etiquetteSquelette}>
            <Skeleton width={64} height={10} />
          </View>
          <Skeleton width="40%" height={10} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenu: { padding: space.lg, gap: space.sm },
  auteur: { marginBottom: space.md },
  ligneSquelette: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.md,
    minHeight: layout.touchTarget,
    paddingVertical: space.sm,
    borderBottomWidth: hairline,
  },
  etiquetteSquelette: { width: layout.fieldLabel },
});
