import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '@/theme/ThemeProvider';
import { fontFamily, fontSize, hairline, layout, lineHeight, space } from '@/theme/tokens';
import { transitionEtat } from '@/theme/transitions';

type Props = Pick<
  TextInputProps,
  'value' | 'onChangeText' | 'onBlur' | 'placeholder' | 'autoFocus' | 'autoCapitalize' | 'inputMode'
> & {
  label: string;
  error?: string;
};

export function FormField({ label, error, ...input }: Props) {
  const { colors } = useTheme();
  const invalide = error !== undefined;
  return (
    <View>
      <View
        style={[
          styles.row,
          transitionEtat,
          { borderBottomColor: invalide ? colors.danger : colors.rule },
        ]}
      >
        <AppText variant="rubric" tone={invalide ? 'danger' : 'secondary'} style={styles.label}>
          {label}
        </AppText>
        <TextInput
          {...input}
          aria-label={label}
          autoCorrect={false}
          placeholderTextColor={colors.inkSecondary}
          selectionColor={colors.signal}
          style={[styles.input, { color: colors.ink }]}
        />
      </View>
      {invalide && (
        <AppText variant="small" tone="danger" role="alert" style={styles.error}>
          {error}
        </AppText>
      )}
    </View>
  );
}

// Typed text starts where the fiche's values start: after the label column and the icon case.
const RETRAIT_VALEUR = layout.iconCase + space.sm;
const COLONNE_VALEUR = layout.fieldLabel + space.md + RETRAIT_VALEUR;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: space.md,
    height: layout.touchTarget,
    borderBottomWidth: hairline,
  },
  label: { width: layout.fieldLabel, alignSelf: 'center' },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingLeft: RETRAIT_VALEUR,
    fontFamily,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    fontVariant: ['tabular-nums'],
  },
  error: { marginTop: space.xs, marginLeft: COLONNE_VALEUR },
});
