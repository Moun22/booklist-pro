import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { layout, space } from '@/theme/tokens';

export type Tally = {
  figure: string;
  label: string;
};

type Props = {
  items: readonly Tally[];
};

export function TallyLine({ items }: Props) {
  return (
    <View role="summary" style={styles.line}>
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && (
            <AppText variant="figure" tone="secondary" aria-hidden>
              {' · '}
            </AppText>
          )}
          <AppText variant="figure" tone="secondary">
            {item.figure} {item.label}
          </AppText>
        </Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: layout.tallyHeight,
    paddingHorizontal: space.lg,
  },
});
