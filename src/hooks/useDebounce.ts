import { useRef, useCallback } from 'react';

export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<number | undefined>(undefined);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  return debouncedCallback;
}
