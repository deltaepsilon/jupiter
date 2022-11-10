import { useCallback, useEffect, useState } from 'react';

import { isServer } from 'ui/utils';
import { useRouter } from 'next/router';

interface Args {
  callback?: ({ hash }: { hash: string }) => void;
  isActive: boolean;
}

export function useHash({ callback, isActive }: Args) {
  const [hash, setHash] = useState<string>('');
  const router = useRouter();
  const asPath = isServer() ? undefined : router.asPath;

  const cb = useCallback(() => {
    const currentHash = window.location.hash;

    setHash(currentHash);
    callback && callback({ hash: currentHash });
  }, [callback]);

  useEffect(() => {
    if (isActive) {
      cb();

      window.addEventListener('hashchange', cb);

      return () => window.removeEventListener('hashchange', cb);
    }
  }, [cb, isActive, asPath]);

  return hash;
}
