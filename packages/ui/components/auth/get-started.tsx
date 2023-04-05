import { Button, SxProps } from '@mui/material';

import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'ui/components';
import NextImage from 'next/image';
import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useRouter } from 'next/router';

export function GetStarted({ show = false, sx = {} }: { show?: boolean; sx?: SxProps }) {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const isRoot = router.route === WEB.ROUTES.ROOT;
  const shouldShow = show || isRoot;

  return user ? (
    shouldShow ? (
      <Link button href={WEB.ROUTES.PHOTOS} sx={sx}>
        <Button startIcon={<LaunchIcon />} variant='contained'>
          Get Started
        </Button>
      </Link>
    ) : null
  ) : (
    <Button onClick={signInWithGoogle} variant='contained'>
      Get Started
    </Button>
  );
}
