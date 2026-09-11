import { StyleSheet, View } from 'react-native';

import { usePreferences } from './PreferencesProvider';
import { AppText } from '@/components/AppText';
import { IconButton } from '@/components/IconButton';
import { Rule } from '@/components/Rule';
import { TextButton } from '@/components/TextButton';
import { useSession } from '@/features/auth/SessionProvider';
import { useTraduction } from '@/features/i18n/useTraduction';
import { useTheme } from '@/theme/ThemeProvider';
import { layout, space } from '@/theme/tokens';

type Props = {
  // Under 960 px the band has no room for the read-only mention; the fiche says it by itself.
  compact?: boolean;
};

// The end of a chrome band: a rule, then theme, language and, once signed in, the way out.
export function ControlesPreferences({ compact = false }: Props) {
  const { scheme } = useTheme();
  const t = useTraduction();
  const { langue, definirTheme, definirLangue } = usePreferences();
  const session = useSession();
  const sombre = scheme === 'dark';

  return (
    <View style={styles.groupe}>
      <View style={styles.separateur}>
        <Rule orientation="vertical" />
      </View>
      <IconButton
        icon={sombre ? 'sun' : 'moon'}
        label={sombre ? t.theme.versClair : t.theme.versSombre}
        onPress={() => definirTheme(sombre ? 'clair' : 'sombre')}
      />
      <TextButton
        label={t.langue.autre}
        accessibilityLabel={t.langue.basculer}
        tone="ink"
        onPress={() => definirLangue(langue === 'fr' ? 'en' : 'fr')}
      />
      {session.utilisateur !== null && (
        <>
          {!compact && !session.peutEcrire && (
            // Small, sentence case: a fact about the account, not a tab one could press.
            <AppText variant="small" tone="secondary" style={styles.mention}>
              {t.session.lectureSeule}
            </AppText>
          )}
          <IconButton
            icon="log-out"
            label={t.session.deconnexion(session.utilisateur.email)}
            onPress={() => {
              void session.deconnexion();
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  groupe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    paddingLeft: space.sm,
  },
  separateur: { height: layout.chromeHeight - 2 * space.sm, flexDirection: 'row' },
  mention: { paddingHorizontal: space.sm },
});
