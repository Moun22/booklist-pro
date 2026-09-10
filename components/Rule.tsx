import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';
import { hairline } from '@/theme/tokens';

type Props = {
  orientation?: 'horizontal' | 'vertical';
};

export function Rule({ orientation = 'horizontal' }: Props) {
  const { colors } = useTheme();
  return (
    <View
      aria-hidden
      style={[
        orientation === 'horizontal' ? styles.horizontal : styles.vertical,
        { backgroundColor: colors.rule },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: { height: hairline, alignSelf: 'stretch' },
  vertical: { width: hairline, alignSelf: 'stretch' },
});
