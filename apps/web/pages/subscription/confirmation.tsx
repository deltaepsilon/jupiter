import { Box, Typography } from '@mui/material';

import { Link } from 'ui/components';
import { LogInOrContinue } from 'ui/components';
import NextImage from 'next/image';
import { WEB } from 'data/web';

export default function LibraryId() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gridGap: '2rem' }}>
      <Typography variant='h2'>Thanks for subscribing!</Typography>

      <Typography variant='body1'>Click your user menu to manage your subscription.</Typography>
      <Box>
        <NextImage alt='manage subscription' height={287} src='/images/manage-subscription.png' width={322} />
      </Box>

      <Typography variant='body1'>Get started with the Web App.</Typography>
      <LogInOrContinue show />

      <Typography variant='body1'>
        Email me at{' '}
        <Link href={`mailto:${WEB.EMAIL}?subject=Quiver%20Photos&body=Chris!%0D%0A%0D%0AI%20have%20questions%20%3A)`}>
          {WEB.EMAIL}
        </Link>{' '}
        if you have any questions.
      </Typography>
    </Box>
  );
}
