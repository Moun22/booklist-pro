import { Pressable, StyleSheet, type View } from 'react-native';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { useAutoFocus } from '@/hooks/useAutoFocus';
import { layout, space } from '@/theme/tokens';

type Props = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  tone?: 'signal' | 'ink' | 'danger';
  disabled?: boolean;
  autoFocus?: boolean;
  onAutoFocus?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export function TextButton({
  label,
  onPress,
  icon,
  tone = 'signal',
  disabled = false,
  autoFocus = false,
  onAutoFocus,
  onFocus,
  onBlur,
}: Props) {
  const bouton = useAutoFocus<View>(autoFocus, onAutoFocus);

  return (
    <Pressable
      ref={bouton}
      role="button"
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {icon !== undefined && <Icon name={icon} tone={tone} />}
      <AppText variant="bodyStrong" tone={tone}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    minHeight: layout.touchTarget,
    paddingHorizontal: space.md,
  },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.5 },
});
