import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Rule } from '@/components/Rule';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SyncMark } from '@/components/SyncMark';
import { useTheme } from '@/theme/ThemeProvider';

const labels = {
  retour: 'Fonds',
  fermer: 'Fermer',
  online: 'En ligne',
};

export type ModeOuvrage = 'ecran' | 'volet';

type Props = {
  mode: ModeOuvrage;
  onFermer: () => void;
  children: ReactNode;
};

export function CadreOuvrage({ mode, onFermer, children }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.cadre, { backgroundColor: colors.page }]}>
      <ScreenHeader
        mode={mode}
        backLabel={labels.retour}
        closeLabel={labels.fermer}
        onClose={onFermer}
        trailing={mode === 'ecran' ? <SyncMark status="online" label={labels.online} /> : undefined}
      />
      {mode === 'ecran' && <Rule />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cadre: { flex: 1 },
});
