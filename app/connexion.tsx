import { Redirect, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';

import { AppText } from '@/components/AppText';
import { Rule } from '@/components/Rule';
import { FormulaireConnexion } from '@/features/auth/FormulaireConnexion';
import { useSession } from '@/features/auth/SessionProvider';
import { useTraduction } from '@/features/i18n/useTraduction';
import { ControlesPreferences } from '@/features/preferences/ControlesPreferences';
import { MarqueServeur } from '@/features/sync/MarqueServeur';
import { useTheme } from '@/theme/ThemeProvider';
import { layout, space } from '@/theme/tokens';

const LARGEUR_COLONNE = 480;
// On a wide screen the lone form sits a third of the way down, not glued to the band.
const RETRAIT_HAUT_LARGE = 3 * space.xxl;

export default function ConnexionScreen() {
  const { colors } = useTheme();
  const t = useTraduction();
  const session = useSession();
  const large = useWindowDimensions().width >= layout.twoPaneMin;
  const { vers } = useLocalSearchParams<{ vers?: string }>();
  // Only a path inside the app is a valid place to go back to.
  const destination =
    typeof vers === 'string' && vers.startsWith('/') && !vers.startsWith('/connexion') ? vers : '/';

  if (session.etat === 'connecte') {
    return <Redirect href={destination} />;
  }

  return (
    <View style={[styles.page, { backgroundColor: colors.page }]}>
      <View style={[styles.bandeau, { backgroundColor: colors.surface }]}>
        <View style={styles.spacer} />
        <MarqueServeur />
        <ControlesPreferences compact />
      </View>
      <Rule />
      <ScrollView
        contentContainerStyle={[styles.contenu, large && styles.contenuLarge]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.colonne}>
          <AppText variant="title">{t.connexion.titre}</AppText>
          <AppText variant="small" tone="secondary" style={styles.explication}>
            {t.connexion.explication}
          </AppText>
          <FormulaireConnexion onConnexion={session.connexion} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  bandeau: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: layout.chromeHeight,
    paddingHorizontal: space.sm,
  },
  spacer: { flex: 1 },
  contenu: { padding: space.lg },
  contenuLarge: { paddingTop: RETRAIT_HAUT_LARGE },
  colonne: { width: '100%', maxWidth: LARGEUR_COLONNE, alignSelf: 'center' },
  explication: { marginTop: space.xs, marginBottom: space.lg },
});
