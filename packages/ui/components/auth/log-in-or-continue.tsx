import { Button } from '@mui/material';
import { Link } from 'ui/components';
import { ROUTES } from 'ui/constants/routes';
import { useAuth } from 'ui/hooks/use-auth';
import { useRouter } from 'next/router';

export function LogInOrContinue() {
  const { signInWithGoogle, user } = useAuth();
  const router = useRouter();
  const isRoot = router.route === ROUTES.ROOT;

  return user ? (
    isRoot ? (
      <Link button href={ROUTES.IMPORTS}>
        <Button>Go to app</Button>
      </Link>
    ) : null
  ) : (
    <Button onClick={signInWithGoogle}>Log in with Google</Button>
  );
}
