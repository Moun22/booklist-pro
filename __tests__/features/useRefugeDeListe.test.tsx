import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, fireEvent, renderHook, screen } from '@testing-library/react-native';

import { ouvrageExemple, reponseVide } from '../helpers/fixtures';
import { creerClientDeTest, creerWrapper } from '../helpers/renderWithProviders';
import type { LigneOuvrage } from '@/components/BookRow';
import type { Ouvrage } from '@/domain/ouvrage';
import { DELAI_ANNULATION_MS, useSuppression } from '@/features/books/SuppressionProvider';
import { useRefugeDeListe } from '@/features/books/useRefugeDeListe';
import { versLigne } from '@/features/books/versLigne';
import { fr } from '@/features/i18n/fr';
import { motion } from '@/theme/tokens';

const premier: Ouvrage = { ...ouvrageExemple, id: 'premier', titre: 'Premier' };
const second: Ouvrage = { ...ouvrageExemple, id: 'second', titre: 'Second' };
const lignes: LigneOuvrage[] = [premier, second].map((ouvrage) => versLigne(ouvrage, fr.ligne));

function rendre(scrollToIndex: () => void, enSortieId: string | null = null) {
  const liste = { current: { scrollToIndex } };
  return renderHook(
    (props: { enSortieId: string | null }) => ({
      refuge: useRefugeDeListe(lignes, props.enSortieId, liste),
      suppression: useSuppression(),
    }),
    { wrapper: creerWrapper(creerClientDeTest()), initialProps: { enSortieId } },
  );
}

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(globalThis, 'fetch').mockImplementation(() => Promise.resolve(reponseVide()));
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('useRefugeDeListe', () => {
  it('points at the row put back by an undo, scrolls to it until a row takes the focus', async () => {
    const scrollToIndex = jest.fn();
    const { result } = await rendre(scrollToIndex);

    await act(async () => {
      result.current.suppression.programmer(second);
    });
    await act(async () => {
      result.current.suppression.annuler();
    });

    expect(result.current.refuge.focusId).toBe('second');
    expect(scrollToIndex).toHaveBeenCalledWith(expect.objectContaining({ index: 1 }));

    await act(async () => {
      result.current.refuge.surFocusPris();
    });
    expect(result.current.refuge.focusId).toBeNull();
    expect(result.current.suppression.refugeId).toBeNull();
  });

  it('points at the neighbouring row when the bar expires while focused', async () => {
    const { result, rerender } = await rendre(jest.fn());

    await act(async () => {
      result.current.suppression.programmer(premier);
    });
    await rerender({ enSortieId: 'premier' });
    await act(async () => {
      jest.advanceTimersByTime(motion.quick);
    });
    await fireEvent(screen.getByRole('button', { name: 'Annuler' }), 'focus');
    await act(async () => {
      jest.advanceTimersByTime(DELAI_ANNULATION_MS);
    });

    expect(result.current.refuge.focusId).toBe('second');
  });

  it('falls back to the first row when the target is not in the list', async () => {
    const { result } = await rendre(jest.fn());

    await act(async () => {
      result.current.suppression.programmer(ouvrageExemple);
    });
    await act(async () => {
      result.current.suppression.annuler();
    });

    expect(result.current.refuge.focusId).toBe('premier');
  });
});
