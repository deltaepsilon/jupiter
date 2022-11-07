import { Box, Typography } from '@mui/material';

import { AppUserBubble } from './app-user-bubble';
import { Link } from 'ui/components';
import { LogInOrContinue } from 'ui/components';
import { WEB } from 'data/web';

export function AppHeader() {
  return (
    <Box component='header' sx={{ display: 'flex', alignItems: 'center', gridGap: 8 }}>
      <Link href={WEB.ROUTES.ROOT} sx={{ flex: 1 }}>
        <Typography sx={{ letterSpacing: 0.05 }} variant='h4'>
          Photos Tools
        </Typography>
      </Link>
      <LogInOrContinue />
      <AppUserBubble />
    </Box>
  );
}
