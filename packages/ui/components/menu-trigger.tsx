import { Box, Menu, MenuProps } from '@mui/material';
import { createContext, useCallback, useContext, useRef, useState } from 'react';

import { NOOP } from 'ui/utils';

interface Props extends Omit<MenuProps, 'open' | 'onClose' | 'anchorEl'> {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const MenuTriggerContext = createContext({ close: NOOP });

export function useMenuTrigger() {
  return useContext(MenuTriggerContext);
}

export function MenuTrigger({ children, trigger, ...menuProps }: Props) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Box onClick={onOpen} ref={triggerRef}>
        {trigger}
      </Box>
      <MenuTriggerContext.Provider value={{ close: onClose }}>
        <Menu anchorEl={triggerRef.current} onClick={onClose} onClose={onClose} open={isOpen} {...menuProps}>
          {children}
        </Menu>
      </MenuTriggerContext.Provider>
    </>
  );
}
