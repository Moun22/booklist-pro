import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { ConfirmInline } from './ConfirmInline';
import { IconButton } from './IconButton';
import { useTheme } from '@/theme/ThemeProvider';
import { hairline, layout, space } from '@/theme/tokens';

type Props = {
  timestamp: string;
  content: string;
  deleteLabel: string;
  question: string;
  confirmLabel: string;
  cancelLabel: string;
  onDelete: () => void;
  autoFocus?: boolean;
  onAutoFocus?: () => void;
};

// After « Garder », focus goes back to the button that asked the question.
type Etape = 'repos' | 'question' | 'gardee';

export function NoteRow({
  timestamp,
  content,
  deleteLabel,
  question,
  confirmLabel,
  cancelLabel,
  onDelete,
  autoFocus = false,
  onAutoFocus,
}: Props) {
  const { colors } = useTheme();
  const [etape, setEtape] = useState<Etape>('repos');

  return (
    <View role="listitem" style={[styles.note, { borderBottomColor: colors.rule }]}>
      {etape === 'question' ? (
        <View style={styles.questionBloc}>
          <ConfirmInline
            message={question}
            confirmLabel={confirmLabel}
            cancelLabel={cancelLabel}
            onConfirm={onDelete}
            onCancel={() => setEtape('gardee')}
          />
        </View>
      ) : (
        <View style={styles.meta}>
          <AppText variant="figure" tone="secondary">
            {timestamp}
          </AppText>
          <IconButton
            icon="trash-2"
            label={deleteLabel}
            autoFocus={autoFocus || etape === 'gardee'}
            onAutoFocus={onAutoFocus}
            onPress={() => setEtape('question')}
          />
        </View>
      )}
      <AppText variant="body" style={styles.contenu}>
        {content}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  note: { paddingBottom: space.md, borderBottomWidth: hairline },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: layout.touchTarget,
  },
  questionBloc: { paddingVertical: space.sm },
  contenu: { paddingRight: layout.touchTarget },
});
