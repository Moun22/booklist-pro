import { Platform, type TextStyle, type ViewStyle } from 'react-native';

import { motion } from './tokens';

// react-native-web turns these keys into CSS transitions; native platforms ignore them.
// The intersection type lets the same object style a view or a text.
export const transitionEtat: ViewStyle & TextStyle = Platform.select({
  web: {
    transitionProperty: 'background-color, border-color, color, opacity',
    transitionDuration: `${motion.quick}ms`,
    transitionTimingFunction: 'ease-out',
  } as ViewStyle & TextStyle,
  default: {},
});
