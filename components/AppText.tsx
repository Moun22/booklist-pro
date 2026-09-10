import { StyleSheet, Text, type TextProps } from 'react-native';

import { useTheme } from '@/theme/ThemeProvider';
import { toneColor, type Tone } from '@/theme/tone';
import { fontFamily, fontSize, lineHeight, rubricTracking } from '@/theme/tokens';

export type TextVariant = 'title' | 'lead' | 'body' | 'bodyStrong' | 'small' | 'rubric' | 'figure';

type Props = TextProps & {
  variant?: TextVariant;
  tone?: Tone;
};

export function AppText({ variant = 'body', tone = 'ink', style, ...rest }: Props) {
  const { colors } = useTheme();
  return (
    <Text {...rest} style={[styles.base, styles[variant], { color: toneColor(colors, tone) }, style]} />
  );
}

const styles = StyleSheet.create({
  base: { fontFamily },
  title: { fontSize: fontSize.title, lineHeight: lineHeight.title, fontWeight: '600' },
  lead: { fontSize: fontSize.lead, lineHeight: lineHeight.lead, fontWeight: '500' },
  body: { fontSize: fontSize.body, lineHeight: lineHeight.body },
  bodyStrong: { fontSize: fontSize.body, lineHeight: lineHeight.body, fontWeight: '600' },
  small: { fontSize: fontSize.small, lineHeight: lineHeight.small },
  rubric: {
    fontSize: fontSize.rubric,
    lineHeight: lineHeight.rubric,
    fontWeight: '600',
    letterSpacing: rubricTracking,
    textTransform: 'uppercase',
  },
  figure: { fontSize: fontSize.small, lineHeight: lineHeight.small, fontVariant: ['tabular-nums'] },
});
