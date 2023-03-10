import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { isClient, stopClick } from 'ui/utils';
import { useKeydown, useModalHash, useValue } from 'ui/hooks';

import { useDebounce } from 'usehooks-ts';

export interface ModalState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpen: (e?: SyntheticEvent) => void;
  onClose: (event?: SyntheticEvent) => void;
  toggle: (event?: SyntheticEvent) => void;
}

export interface Args {
  delay?: number;
  startOpen?: boolean;
  closeOnEscape?: boolean;
  autoOpenHash?: string;
}

export function useModalState(
  { delay = 0, closeOnEscape = false, startOpen = false, autoOpenHash = '' }: Args = {
    startOpen: false,
    closeOnEscape: false,
  }
): ModalState {
  const { isMatchingHash, closeModalHash, openModalHash } = useModalHash({ autoOpenHash });
  const [rawIsOpen, setIsOpen] = useState(startOpen);
  const [scrollPosition, setScrollPosition] = useState<number | null>(null);
  const isOpen = useDebounce<boolean>(rawIsOpen || isMatchingHash, delay);
  const onOpen = useCallback(
    (e?: SyntheticEvent) => {
      e?.stopPropagation();

      isClient(() => {
        setScrollPosition(window.pageYOffset);
      });

      setIsOpen(true);
      openModalHash();
    },
    [openModalHash]
  );
  const onClose = useCallback(
    (e?: SyntheticEvent) => {
      stopClick(e);
      setIsOpen(false);
      closeModalHash();

      if (isClient() && scrollPosition !== null) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);

          setScrollPosition(null);
        }, 200);
      }
    },
    [closeModalHash, scrollPosition]
  );
  const toggle = useCallback(
    (e?: SyntheticEvent) => {
      e && stopClick(e);

      rawIsOpen ? onClose() : onOpen();
    },
    [onClose, onOpen, rawIsOpen]
  );
  const onKeydown = useCallback(
    (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;

      switch (keyboardEvent.key) {
        case 'Escape':
          return onClose();
      }
    },
    [onClose]
  );

  useKeydown({ isActive: !!isOpen && closeOnEscape, callback: onKeydown });

  useEffect(() => {
    if (isOpen && !isMatchingHash && autoOpenHash) {
      setIsOpen(false);
    }
  }, [autoOpenHash, isOpen, isMatchingHash, setIsOpen]);

  return useValue({ isOpen: !!isOpen, setIsOpen, onClose, onOpen, toggle });
}
