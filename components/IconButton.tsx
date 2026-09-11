import { Pressable, StyleSheet, type View } from 'react-native';

import { Icon, type IconName } from './Icon';
import { useAutoFocus } from '@/hooks/useAutoFocus';
import type { Tone } from '@/theme/tone';
import { layout } from '@/theme/tokens';

type Props = {
  icon: IconName;
  label: string;
  onPress: () => void;
  tone?: Tone;
  autoFocus?: boolean;
  onAutoFocus?: () => void;
};

export function IconButton({
  icon,
  label,
  onPress,
  tone = 'secondary',
  autoFocus = false,
  onAutoFocus,
}: Props) {
  const bouton = useAutoFocus<View>(autoFocus, onAutoFocus);
  return (
    <Pressable
      ref={bouton}
      role="button"
      aria-label={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Icon name={icon} tone={tone} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: layout.touchTarget,
    height: layout.touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.7 },
});
