import { IconButton, Modal, Portal, Typography } from '@mui/material';
import { NOOP, retry } from 'ui/utils';
import { createContext, createRef, useContext, useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { HiddenScroll } from 'ui/components/hidden-scroll';
import { useDebounce } from 'usehooks-ts';

interface Props {
  ['aria-describedby']: string;
  ['aria-labelledby']: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}

interface ModalDrawerValue {
  isOpen: boolean;
  onClose?: () => void;
  footerRef: React.RefObject<HTMLDivElement>;
}

const ModalDrawerContext = createContext<ModalDrawerValue>({
  footerRef: createRef(),
  isOpen: false,
  onClose: NOOP,
});

export const MODAL_DRAWER_WIDTHS = ['100vw', 'calc(100vw - 10rem)', '75vw', '50vw', '40vw'];

export function useModalDrawer() {
  return useContext(ModalDrawerContext);
}

export function ModalDrawer({ children, isOpen = false, onClose, title = '', ...rest }: Props) {
  const [showBackdrop, setShowBackdrop] = useState(true);
  const debouncedIsOpen = useDebounce(isOpen, 500) ?? false;
  const isOpening = isOpen && !debouncedIsOpen;
  const isClosing = !isOpen && debouncedIsOpen;
  const isModalOpen = isOpen || isOpening || isClosing;
  const footerRef = useRef<HTMLDivElement>(null);
  const value = { footerRef, isOpen, onClose };

  useEffect(() => {
    const backdrops = document.querySelectorAll('.MuiBackdrop-root');

    backdrops.length > 1 && setShowBackdrop(false);
  }, []);

  return (
    <ModalDrawerContext.Provider value={value}>
      <Modal
        data-material-modal
        onClose={onClose}
        open={isModalOpen}
        slotProps={{
          backdrop: { transitionDuration: 500, sx: { background: showBackdrop ? undefined : 'transparent' } },
        }}
        {...rest}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            position: 'absolute',
            inset:
              debouncedIsOpen !== isOpen
                ? ['100vh 0 0 0', '0 0 0 100vw']
                : [
                    `0 0 0 calc(100vw - ${MODAL_DRAWER_WIDTHS[0]})`,
                    `0 0 0 calc(100vw - ${MODAL_DRAWER_WIDTHS[1]})`,
                    `0 0 0 calc(100vw - ${MODAL_DRAWER_WIDTHS[2]})`,
                    `0 0 0 calc(100vw - ${MODAL_DRAWER_WIDTHS[3]})`,
                    `0 0 0 calc(100vw - ${MODAL_DRAWER_WIDTHS[4]})`,
                  ],
            transition: 'inset 300ms',
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              padding: [1, 2],
              borderBottom: '1px solid',
              borderColor: 'text.primary',
            }}
          >
            <Typography sx={{ flex: 1 }} variant='h6'>
              {title}
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'text.primary' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <HiddenScroll sx={{ flex: 1 }}>{children}</HiddenScroll>
          <Box
            ref={footerRef}
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexDirection: 'row-reverse',
              borderTop: '1px solid',
              borderColor: 'text.primary',
              padding: [1, 2],
            }}
          />
        </Box>
      </Modal>
    </ModalDrawerContext.Provider>
  );
}

export function ModalDrawerFooter({ children }: { children: React.ReactNode }) {
  const { footerRef } = useModalDrawer();
  const [isReady, setIsReady] = useState(!!footerRef.current);

  useEffect(() => {
    retry(
      () => {
        if (footerRef.current) {
          setIsReady(true);
        } else {
          throw new Error('footerRef.current is not defined');
        }
      },
      { attempts: 10, millis: 300, failSilently: true }
    )();
  }, [footerRef, setIsReady]);

  return isReady ? <Portal container={footerRef.current}>{children}</Portal> : null;
}
