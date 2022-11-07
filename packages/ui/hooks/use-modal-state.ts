import React, { SyntheticEvent, useCallback, useState } from 'react';
import { isClient, stopClick } from 'ui/utils';
import { useKeydown, useValue } from 'ui/hooks';

import { useDebounce } from 'usehooks-ts';

export interface ModalState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpen: () => void;
  onClose: (event?: SyntheticEvent) => void;
  toggle: (event?: SyntheticEvent) => void;
}

export interface Args {
  delay?: number;
  startOpen?: boolean;
  closeOnEscape?: boolean;
}

export function useModalState(
  { delay = 0, closeOnEscape = false, startOpen = false }: Args = {
    startOpen: false,
    closeOnEscape: false,
  }
): ModalState {
  const [rawIsOpen, setIsOpen] = useState(startOpen);
  const [scrollPosition, setScrollPosition] = useState<number | null>(null);
  const isOpen = useDebounce<boolean>(rawIsOpen, delay);
  const onOpen = useCallback(() => {
    isClient(() => {
      setScrollPosition(window.pageYOffset);
    });

    setIsOpen(true);
  }, [setIsOpen]);
  const onClose = useCallback(
    (e?: SyntheticEvent) => {
      stopClick(e);
      setIsOpen(false);

      if (isClient() && scrollPosition !== null) {
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);

          setScrollPosition(null);
        }, 200);
      }
    },
    [scrollPosition, setIsOpen]
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

  return useValue({ isOpen: !!isOpen, setIsOpen, onClose, onOpen, toggle });
}
