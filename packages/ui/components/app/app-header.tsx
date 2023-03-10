import { Box, Typography } from '@mui/material';

import { AppUserBubble } from './app-user-bubble';
import { Image } from 'ui/components';
import { Link } from 'ui/components';
import { LogInOrContinue } from 'ui/components';
import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

export function AppHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const linkToRoot = useMemo(() => !user || router.route === WEB.ROUTES.PHOTOS, [router, user]);

  return (
    <Box component='header' sx={{ display: 'flex', alignItems: 'center', gridGap: 8 }}>
      <Link button href={linkToRoot ? WEB.ROUTES.ROOT : WEB.ROUTES.PHOTOS} sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gridGap: 8 }}>
          <svg height='48' width='48' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M22.3 17.8h18.85q-1.6-4.15-4.95-7.175Q32.85 7.6 28.8 6.45Zm-4.5 4.8 9.55-16.55q-.4-.1-1.45-.175-1.05-.075-1.95-.075-3.5 0-6.775 1.325Q13.9 8.45 11.2 11.05ZM6.4 28.5h13l-9.3-16.3q-2.15 2.7-3.225 5.675Q5.8 20.85 5.8 24.05q0 .95.15 2.025T6.4 28.5Zm13 13.1L26 30H6.85q1.35 4.2 4.8 7.325Q15.1 40.45 19.4 41.6Zm4.7.6q3.55 0 6.85-1.375t5.9-3.975l-6.4-11.15-9.55 16.25q.5.1 1.45.175.95.075 1.75.075Zm13.8-6.45q2.3-2.7 3.3-5.6 1-2.9 1-6.15 0-1.05-.15-2.2-.15-1.15-.4-2.45H28.6Z'
              fill='var(--color-orange)'
            />
          </svg>
          <Typography
            sx={{ fontFamily: 'gelica, serif', fontWeight: 600, letterSpacing: 0.05, marginTop: 0.5 }}
            variant='h5'
          >
            Quiver Photos
          </Typography>
        </Box>
      </Link>
      <LogInOrContinue />
      <AppUserBubble />
    </Box>
  );
}
