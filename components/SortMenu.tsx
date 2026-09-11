import { useState } from 'react';
import { Pressable, StyleSheet, View, type View as ViewRef } from 'react-native';

import { AppText } from './AppText';
import { Icon } from './Icon';
import { useAutoFocus } from '@/hooks/useAutoFocus';
import { useEscape } from '@/hooks/useEscape';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, overlayShadow, space } from '@/theme/tokens';
import { transitionEtat } from '@/theme/transitions';

export type SortOption = { key: string; label: string };

export type SortDirection = 'asc' | 'desc';

type Props = {
  options: readonly SortOption[];
  activeKey: string;
  direction: SortDirection;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSelect: (key: string) => void;
  labels: { group: string; prefix: string; asc: string; desc: string; hint: string };
};

const HIT_SLOP = { top: space.sm, bottom: space.sm };

export function SortMenu({
  options,
  activeKey,
  direction,
  open,
  onOpen,
  onClose,
  onSelect,
  labels,
}: Props) {
  const { colors, scheme } = useTheme();
  const active = options.find((option) => option.key === activeKey);
  const directionLabel = direction === 'asc' ? labels.asc : labels.desc;
  const arrow = direction === 'asc' ? 'arrow-up' : 'arrow-down';
  useEscape(onClose, open);

  // Focus comes back to the trigger each time the menu closes, whatever closed it.
  const [etaitOuvert, setEtaitOuvert] = useState(open);
  const [retourFocus, setRetourFocus] = useState(false);
  if (etaitOuvert !== open) {
    setEtaitOuvert(open);
    setRetourFocus(!open);
  }
  const declencheur = useAutoFocus<ViewRef>(retourFocus);

  return (
    <View style={styles.ancre}>
      <Pressable
        ref={declencheur}
        role="button"
        aria-expanded={open}
        aria-label={`${labels.prefix} ${active?.label ?? activeKey}, ${directionLabel}`}
        hitSlop={HIT_SLOP}
        onPress={open ? onClose : onOpen}
        style={({ pressed }) => [styles.declencheur, pressed && styles.pressed]}
      >
        <AppText variant="figure" tone={open ? 'ink' : 'secondary'} style={transitionEtat}>
          {labels.prefix} {active?.label ?? activeKey}
        </AppText>
        <Icon name={arrow} tone={open ? 'ink' : 'secondary'} />
      </Pressable>
      {open && (
        <View
          role="radiogroup"
          aria-label={labels.group}
          style={[
            styles.menu,
            {
              backgroundColor: colors.page,
              borderColor: colors.rule,
              boxShadow: overlayShadow[scheme],
            },
          ]}
        >
          {options.map((option) => (
            <Choix
              key={option.key}
              option={option}
              checked={option.key === activeKey}
              arrow={arrow}
              directionLabel={directionLabel}
              onSelect={onSelect}
            />
          ))}
          <AppText variant="small" tone="secondary" style={styles.indice}>
            {labels.hint}
          </AppText>
        </View>
      )}
    </View>
  );
}

type ChoixProps = {
  option: SortOption;
  checked: boolean;
  arrow: 'arrow-up' | 'arrow-down';
  directionLabel: string;
  onSelect: (key: string) => void;
};

function Choix({ option, checked, arrow, directionLabel, onSelect }: ChoixProps) {
  const { colors } = useTheme();
  const ref = useAutoFocus<ViewRef>(checked);
  return (
    <Pressable
      ref={ref}
      role="radio"
      aria-checked={checked}
      aria-label={checked ? `${option.label}, ${directionLabel}` : option.label}
      onPress={() => onSelect(option.key)}
      style={({ pressed }) => [
        styles.choix,
        transitionEtat,
        { borderBottomColor: colors.rule, backgroundColor: checked ? colors.surface : colors.page },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.case}>{checked && <Icon name="check" />}</View>
      <AppText variant="body" style={styles.libelle}>
        {option.label}
      </AppText>
      {checked && <Icon name={arrow} tone="secondary" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  ancre: { justifyContent: 'center' },
  declencheur: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    minHeight: layout.tallyHeight,
  },
  menu: {
    position: 'absolute',
    top: layout.tallyHeight,
    right: 0,
    zIndex: 2,
    minWidth: 220,
    borderWidth: hairline,
    paddingBottom: space.sm,
  },
  choix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.sm,
    minHeight: layout.touchTarget,
    paddingHorizontal: space.lg,
    borderBottomWidth: hairline,
  },
  case: { width: layout.iconCase, alignItems: 'center' },
  libelle: { flex: 1 },
  indice: { paddingHorizontal: space.lg, paddingTop: space.sm },
  pressed: { opacity: 0.7 },
});
