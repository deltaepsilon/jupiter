import { Box, SxProps } from '@mui/material';
import { createContext, useContext, useRef } from 'react';

import ReactDOM from 'react-dom';
import { useWaitForRef } from 'ui/hooks';

export function AppFooter({ children, sx = {} }: { children: React.ReactNode; sx: SxProps }): React.ReactPortal | null {
  const el = useContext(FooterPortalContext);

  return el ? ReactDOM.createPortal(<Box sx={sx}>{children}</Box>, el) : null;
}

const FooterPortalContext = createContext<HTMLElement | null>(null);

export function AppFooterPortalProvider({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLElement>(null);
  const el = useWaitForRef(footerRef);

  return (
    <FooterPortalContext.Provider value={el}>
      {children}
      <Box data-footer-portal ref={footerRef} sx={{}} />
    </FooterPortalContext.Provider>
  );
}
