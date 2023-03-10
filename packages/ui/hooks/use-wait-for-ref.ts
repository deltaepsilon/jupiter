import { RefObject, useEffect, useState } from 'react';

export function useWaitForRef<T>(ref: RefObject<T>, timeout = 100) {
  const [result, setResult] = useState<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      setResult(ref.current);
    } else {
      const timeoutId = setInterval(() => {
        if (ref.current) {
          setResult(ref.current);
          clearInterval(timeoutId);
        }
      }, timeout);
      return () => clearInterval(timeoutId);
    }
  }, [ref, timeout]);

  return result;
}
