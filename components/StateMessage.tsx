import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { TextButton } from './TextButton';
import { space } from '@/theme/tokens';

type Props = {
  icon: IconName;
  title: string;
  description?: string;
  action?: { label: string; icon?: IconName; onPress: () => void };
  tone?: 'ink' | 'danger';
};

export function StateMessage({ icon, title, description, action, tone = 'ink' }: Props) {
  const isError = tone === 'danger';
  return (
    <View style={styles.box}>
      <Icon name={icon} tone={isError ? 'danger' : 'secondary'} size={24} />
      <AppText variant="lead" role={isError ? 'alert' : undefined} style={styles.centered}>
        {title}
      </AppText>
      {description !== undefined && (
        <AppText variant="small" tone="secondary" style={styles.centered}>
          {description}
        </AppText>
      )}
      {action !== undefined && (
        <TextButton label={action.label} icon={action.icon} onPress={action.onPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    gap: space.sm,
    paddingVertical: space.xxl,
    paddingHorizontal: space.xl,
  },
  centered: { textAlign: 'center', maxWidth: 420 },
});
