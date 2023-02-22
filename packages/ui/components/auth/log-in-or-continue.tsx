import { Button } from '@mui/material';
import { Link } from 'ui/components';
import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useRouter } from 'next/router';
import LaunchIcon from '@mui/icons-material/Launch';

export function LogInOrContinue() {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const isRoot = router.route === WEB.ROUTES.ROOT;

  return user ? (
    isRoot ? (
      <Link button href={WEB.ROUTES.PHOTOS}>
        <Button startIcon={<LaunchIcon />}>Web App</Button>
      </Link>
    ) : null
  ) : (
    <Button onClick={signInWithGoogle}>Log in with Google</Button>
  );
}
