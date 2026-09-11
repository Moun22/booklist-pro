import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from './AppText';
import { useTheme } from '@/theme/ThemeProvider';
import { fontFamily, fontSize, hairline, layout, lineHeight, space } from '@/theme/tokens';
import { transitionEtat } from '@/theme/transitions';

type Props = Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'maxLength'> & {
  label: string;
  error?: string;
};

export function TextAreaField({ label, error, ...input }: Props) {
  const { colors } = useTheme();
  const [hauteur, setHauteur] = useState<number | undefined>(undefined);
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
          multiline
          numberOfLines={1}
          aria-label={label}
          placeholderTextColor={colors.inkSecondary}
          selectionColor={colors.signal}
          onContentSizeChange={(evenement) => setHauteur(evenement.nativeEvent.contentSize.height)}
          style={[
            styles.input,
            { color: colors.ink },
            hauteur !== undefined && { height: hauteur },
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

// Same columns as a single-line field: the text starts after the label and the icon case.
const RETRAIT_VALEUR = layout.iconCase + space.sm;
const COLONNE_VALEUR = layout.fieldLabel + space.md + RETRAIT_VALEUR;
const RETRAIT_LIGNE = (layout.touchTarget - lineHeight.body) / 2;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: space.md,
    minHeight: layout.touchTarget,
    borderBottomWidth: hairline,
  },
  label: {
    width: layout.fieldLabel,
    paddingTop: (layout.touchTarget - lineHeight.rubric) / 2,
  },
  input: {
    flex: 1,
    minHeight: layout.touchTarget,
    paddingVertical: RETRAIT_LIGNE,
    paddingLeft: RETRAIT_VALEUR,
    fontFamily,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    fontVariant: ['tabular-nums'],
    textAlignVertical: 'top',
  },
  error: { marginTop: space.xs, marginLeft: COLONNE_VALEUR },
});
