import { Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'ui/components';
import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useRouter } from 'next/router';

export function LogInOrContinue() {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const isRoot = router.route === WEB.ROUTES.ROOT;

  return user ? (
    isRoot ? (
      <Link button href={WEB.ROUTES.PHOTOS} sx={{ paddingRight: 2 }}>
        <Button startIcon={<LaunchIcon />} variant='outlined'>
          Web App
        </Button>
      </Link>
    ) : null
  ) : (
    <Button onClick={signInWithGoogle} variant='contained'>
      Log in
    </Button>
  );
}
