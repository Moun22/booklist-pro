import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react-native';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useDebouncedValue', () => {
  it('only publishes a value that stayed stable for the whole delay', async () => {
    const { result, rerender } = await renderHook(
      ({ valeur }: { valeur: string }) => useDebouncedValue(valeur, 300),
      { initialProps: { valeur: 'd' } },
    );

    expect(result.current).toBe('d');

    await rerender({ valeur: 'du' });
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    await rerender({ valeur: 'dun' });
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('d');

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe('dun');
  });
});
