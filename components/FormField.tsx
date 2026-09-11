import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '@/theme/ThemeProvider';
import { fontFamily, fontSize, hairline, layout, lineHeight, space } from '@/theme/tokens';
import { sansContourFocus, transitionEtat } from '@/theme/transitions';

type Props = Pick<
  TextInputProps,
  | 'value'
  | 'onChangeText'
  | 'onBlur'
  | 'placeholder'
  | 'autoFocus'
  | 'autoCapitalize'
  | 'autoComplete'
  | 'inputMode'
  | 'secureTextEntry'
  | 'onSubmitEditing'
> & {
  label: string;
  error?: string;
};

const TRAIT_FOCUS = 2;

export function FormField({ label, error, onBlur, ...input }: Props) {
  const { colors } = useTheme();
  const [focalise, setFocalise] = useState(false);
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
          onFocus={() => setFocalise(true)}
          onBlur={(evenement) => {
            setFocalise(false);
            onBlur?.(evenement);
          }}
          style={[styles.input, sansContourFocus, { color: colors.ink }]}
        />
        {/* Focus lives on the rule like every other field state: it thickens into a signal line. */}
        <View
          aria-hidden
          style={[
            styles.trait,
            transitionEtat,
            { backgroundColor: colors.signal, opacity: focalise ? 1 : 0 },
          ]}
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
  trait: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -hairline,
    height: TRAIT_FOCUS,
  },
  error: { marginTop: space.xs, marginLeft: COLONNE_VALEUR },
});
