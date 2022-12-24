import { cleanPath } from 'ui/utils';
import { useCallback } from 'react';
import { useHash } from 'ui/hooks/use-hash';
import { useRouter } from 'next/router';

export function useModalHash({ autoOpenHash }: { autoOpenHash: string }): {
  isMatchingHash: boolean;
  closeModalHash: () => void;
  openModalHash: () => void;
} {
  const hash = useHash({ isActive: true });
  const isMatchingHash = !!autoOpenHash && `#${autoOpenHash}` === hash;

  const router = useRouter();

  const closeModalHash = useCallback(() => {
    if (autoOpenHash) {
      router.push(cleanPath(), undefined, { shallow: true, scroll: false });

      setTimeout(() => window.dispatchEvent(new HashChangeEvent('hashchange')));
    }
  }, [autoOpenHash, router]);

  const openModalHash = useCallback(() => {
    if (autoOpenHash) {
      router.push(`${router.asPath}#${autoOpenHash}`);

      setTimeout(() => window.dispatchEvent(new HashChangeEvent('hashchange')));
    }
  }, [autoOpenHash, router]);

  return { isMatchingHash, closeModalHash, openModalHash };
}
