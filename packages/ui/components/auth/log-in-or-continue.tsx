import { Button, SxProps } from '@mui/material';

import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'ui/components';
import NextImage from 'next/image';
import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useRouter } from 'next/router';

export function LogInOrContinue({ sx = {} }: { sx?: SxProps }) {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const isRoot = router.route === WEB.ROUTES.ROOT;

  return user ? (
    isRoot ? (
      <Link button href={WEB.ROUTES.PHOTOS} sx={sx}>
        <Button startIcon={<LaunchIcon />} variant='outlined'>
          Web App
        </Button>
      </Link>
    ) : null
  ) : (
    <Button onClick={signInWithGoogle} variant='text'>
      <NextImage
        alt='sign in with google'
        height={46}
        src='/icons/btn_google_signin_dark_normal_web@2x.png'
        width={191}
      />
    </Button>
  );
}
