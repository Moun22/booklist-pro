import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon } from './Icon';
import type { SourceCouverture } from '@/domain/couverture';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, motion, radius } from '@/theme/tokens';

type Props = {
  source: SourceCouverture;
  label: string;
  width: number;
  height: number;
};

// A cover is a sized, cached picture; a missing or broken one becomes a quiet stand-in, never a
// broken image.
export function CoverImage({ source, label, width, height }: Props) {
  const { colors } = useTheme();
  const [enEchec, setEnEchec] = useState(false);
  const taille = { width, height };

  if ('repli' in source || enEchec) {
    return (
      <View
        role="img"
        aria-label={label}
        style={[
          styles.repli,
          taille,
          { backgroundColor: colors.surface, borderColor: colors.rule },
        ]}
      >
        <Icon name="book" tone="secondary" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: source.uri }}
      alt={label}
      accessibilityLabel={label}
      contentFit="cover"
      cachePolicy="memory-disk"
      recyclingKey={source.uri}
      transition={motion.quick}
      onError={() => setEnEchec(true)}
      style={[styles.image, taille, { backgroundColor: colors.surface }]}
    />
  );
}

const styles = StyleSheet.create({
  image: { borderRadius: radius.sm },
  repli: {
    borderRadius: radius.sm,
    borderWidth: hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
