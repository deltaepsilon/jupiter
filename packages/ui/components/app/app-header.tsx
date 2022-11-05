import { Box, Typography } from '@mui/material';

import { AppUserBubble } from './app-user-bubble';
import { Link } from 'ui/components';
import { LogInOrContinue } from 'ui/components';
import { ROUTES } from 'ui/constants/routes';

export function AppHeader() {
  return (
    <Box component='header' sx={{ display: 'flex', alignItems: 'center', gridGap: 8 }}>
      <Link href={ROUTES.ROOT} sx={{ flex: 1 }}>
        <Typography sx={{ letterSpacing: 0.05 }} variant='h4'>
          Photos Tools
        </Typography>
      </Link>
      <LogInOrContinue />
      <AppUserBubble />
    </Box>
  );
}
