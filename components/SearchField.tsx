import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Icon } from './Icon';
import { useTheme } from '@/theme/ThemeProvider';
import { fontFamily, fontSize, layout, lineHeight, space } from '@/theme/tokens';

type Props = Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'autoFocus'> & {
  label: string;
};

export function SearchField({ label, ...input }: Props) {
  const { colors } = useTheme();
  return (
    <View style={styles.field}>
      <Icon name="search" tone="secondary" />
      <TextInput
        {...input}
        aria-label={label}
        role="searchbox"
        inputMode="search"
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={colors.inkSecondary}
        selectionColor={colors.signal}
        style={[styles.input, { color: colors.ink }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    minHeight: layout.touchTarget,
  },
  input: {
    flex: 1,
    minHeight: layout.touchTarget,
    paddingVertical: space.sm,
    fontFamily,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
  },
});
