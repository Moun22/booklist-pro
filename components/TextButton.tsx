import { Pressable, StyleSheet } from 'react-native';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { layout, space } from '@/theme/tokens';

type Props = {
  label: string;
  onPress: () => void;
  icon?: IconName;
  tone?: 'signal' | 'ink' | 'danger';
  disabled?: boolean;
};

export function TextButton({ label, onPress, icon, tone = 'signal', disabled = false }: Props) {
  return (
    <Pressable
      role="button"
      aria-disabled={disabled}
      disabled={disabled}
      onPress={onPress}
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
