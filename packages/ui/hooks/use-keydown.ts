import { useEffect } from 'react';

interface UseKeydownArgs {
  isActive: boolean;
  el?: HTMLElement | HTMLInputElement | HTMLTextAreaElement | null;
  callback: EventListenerOrEventListenerObject;
}

export function useKeydown({ isActive = true, el, callback }: UseKeydownArgs, memoArray = [] as any) {
  useEffect(() => {
    if (isActive) {
      const target = el || window.document;

      target.addEventListener('keydown', callback);

      return () => target.removeEventListener('keydown', callback);
    }
  }, [isActive, callback, el, ...memoArray]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
