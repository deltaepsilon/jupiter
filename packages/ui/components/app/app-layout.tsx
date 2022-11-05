import { Box, ThemeProvider } from '@mui/material';

import { AppHead } from './app-head';
import { AppHeader } from './app-header';
import { theme } from '../../styles/theme';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHead />
      <ThemeProvider theme={theme}>
        <Box sx={{ paddingX: [1, 1, 2], paddingY: [1, 1, 2] }}>
          <AppHeader />
          <Box>{children}</Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
