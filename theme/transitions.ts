import { Platform, type ViewStyle } from 'react-native';

import { motion } from './tokens';

// react-native-web turns these keys into CSS transitions; native platforms ignore them.
export const transitionEtat: ViewStyle = Platform.select({
  web: {
    transitionProperty: 'background-color, border-color, opacity',
    transitionDuration: `${motion.quick}ms`,
    transitionTimingFunction: 'ease-out',
  } as ViewStyle,
  default: {},
});
