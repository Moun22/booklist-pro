import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Rule } from '@/components/Rule';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SyncMark } from '@/components/SyncMark';
import { useTraduction } from '@/features/i18n/useTraduction';
import { useTheme } from '@/theme/ThemeProvider';

export type ModeOuvrage = 'ecran' | 'volet';

type Props = {
  mode: ModeOuvrage;
  onFermer: () => void;
  children: ReactNode;
};

export function CadreOuvrage({ mode, onFermer, children }: Props) {
  const { colors } = useTheme();
  const t = useTraduction();
  return (
    <View style={[styles.cadre, { backgroundColor: colors.page }]}>
      <ScreenHeader
        mode={mode}
        backLabel={t.cadre.retour}
        closeLabel={t.cadre.fermer}
        onClose={onFermer}
        trailing={
          mode === 'ecran' ? <SyncMark status="online" label={t.chrome.online} /> : undefined
        }
      />
      {mode === 'ecran' && <Rule />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cadre: { flex: 1 },
});
