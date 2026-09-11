import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { TextButton } from './TextButton';
import { space } from '@/theme/tokens';

type Props = {
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmInline({ message, confirmLabel, cancelLabel, onConfirm, onCancel }: Props) {
  return (
    <View role="group" aria-label={message} style={styles.bloc}>
      <AppText variant="body">{message}</AppText>
      <View style={styles.actions}>
        <TextButton label={cancelLabel} tone="ink" onPress={onCancel} autoFocus />
        <TextButton label={confirmLabel} icon="trash-2" tone="danger" onPress={onConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bloc: { gap: space.xs },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: space.sm },
});
