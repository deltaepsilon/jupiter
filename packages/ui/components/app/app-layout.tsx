import { Box, ThemeProvider } from '@mui/material';

import { AppFooterPortalProvider } from './app-footer';
import { AppHead } from './app-head';
import { AppHeader } from './app-header';
import { theme } from '../../styles/theme';
import { V2Alert } from './v2-alert';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHead />
      <ThemeProvider theme={theme}>
        <AppFooterPortalProvider>
          <V2Alert />
          <Box sx={{ flex: 1, paddingX: [1, 1, 2], paddingY: [1, 1, 2] }}>
            <AppHeader />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gridGap: 4,
              }}
            >
              {children}
            </Box>
          </Box>
        </AppFooterPortalProvider>
      </ThemeProvider>
    </>
  );
}
