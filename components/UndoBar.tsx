import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { TextButton } from './TextButton';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

type Props = {
  subject: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
  dureeMs?: number;
  tone?: 'ink' | 'danger';
  secondaryLabel?: string;
  onSecondary?: () => void;
  autoFocus?: boolean;
  onFocusChange?: (inside: boolean) => void;
};

const PROGRESSION_HAUTEUR = 2;
const ESPACE_INSECABLE = String.fromCharCode(0xa0);

export function UndoBar({
  subject,
  message,
  actionLabel,
  onAction,
  dureeMs,
  tone = 'ink',
  secondaryLabel,
  onSecondary,
  autoFocus = false,
  onFocusChange,
}: Props) {
  const { colors } = useTheme();
  const [progression] = useState(() => new Animated.Value(1));
  const focusPris = () => onFocusChange?.(true);
  const focusRendu = () => onFocusChange?.(false);

  useEffect(() => {
    if (dureeMs === undefined) {
      return;
    }
    const animation = Animated.timing(progression, {
      toValue: 0,
      duration: dureeMs,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progression, dureeMs]);

  return (
    <View style={[styles.barre, { backgroundColor: colors.surface, borderTopColor: colors.rule }]}>
      {dureeMs !== undefined && (
        <Animated.View
          aria-hidden
          style={[
            styles.progression,
            { backgroundColor: colors.signal, transform: [{ scaleX: progression }] },
          ]}
        />
      )}
      {/* Only the quoted subject gives way when the bar is narrow; the verb always stays legible. */}
      <View style={styles.texte}>
        <AppText
          variant="body"
          tone={tone}
          numberOfLines={1}
          ellipsizeMode="middle"
          style={styles.sujet}
        >
          {`«${ESPACE_INSECABLE}${subject}`}
        </AppText>
        <AppText variant="body" tone={tone} numberOfLines={1} style={styles.suite}>
          {`${ESPACE_INSECABLE}» ${message}`}
        </AppText>
      </View>
      {secondaryLabel !== undefined && onSecondary !== undefined && (
        <TextButton
          label={secondaryLabel}
          tone="ink"
          onPress={onSecondary}
          onFocus={focusPris}
          onBlur={focusRendu}
        />
      )}
      <TextButton
        label={actionLabel}
        icon={tone === 'danger' ? 'refresh-cw' : 'rotate-ccw'}
        tone={tone === 'danger' ? 'danger' : 'signal'}
        onPress={onAction}
        autoFocus={autoFocus}
        onFocus={focusPris}
        onBlur={focusRendu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    minHeight: layout.chromeHeight,
    paddingLeft: space.lg,
    paddingRight: space.sm,
    borderTopWidth: hairline,
  },
  progression: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PROGRESSION_HAUTEUR,
    transformOrigin: 'left',
  },
  texte: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  sujet: { flexShrink: 1 },
  suite: { flexShrink: 0 },
});
