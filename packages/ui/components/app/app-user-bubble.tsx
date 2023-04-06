import { Button, CircularProgress, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material';
import { Image, Link, MenuTrigger, useMenuTrigger } from 'ui/components';
import { StripeReturnValue, useStripe } from 'web/hooks';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsIcon from '@mui/icons-material/Collections';
import { DesktopAppDownloadsDrawer } from 'web/components/daemon';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useRouter } from 'next/router';

export function AppUserBubble() {
  const { user } = useAuth();
  const { isRedirecting, redirectToSubscription } = useStripe();

  return user ? (
    <MenuTrigger
      anchorOrigin={{ horizontal: 'right', vertical: 50 }}
      trigger={<UserBubbleButton isLoading={isRedirecting} />}
    >
      <UserBubbleList redirectToSubscription={redirectToSubscription} />
    </MenuTrigger>
  ) : null;
}

function UserBubbleList({
  redirectToSubscription,
}: {
  redirectToSubscription: StripeReturnValue['redirectToSubscription'];
}) {
  const { isSubscriber, signOut } = useAuth();
  const { close } = useMenuTrigger();
  const router = useRouter();
  const isPhotosRoute = router.route === WEB.ROUTES.PHOTOS;

  return (
    <MenuList onClick={close} sx={{ padding: 0 }}>
      {!isPhotosRoute && (
        <Link button href={WEB.ROUTES.PHOTOS}>
          <MenuItem>
            <ListItemIcon>
              <CollectionsIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ marginTop: -0.5 }} variant='body2'>
                Connected Libraries
              </Typography>
            </ListItemText>
          </MenuItem>
        </Link>
      )}

      <DesktopAppDownloadsDrawer>
        <MenuItem>
          <ListItemIcon>
            <DownloadIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ marginTop: -0.5 }} variant='body2'>
              Desktop App
            </Typography>
          </ListItemText>
        </MenuItem>
      </DesktopAppDownloadsDrawer>

      {isSubscriber ? (
        <Link blank button href={WEB.STRIPE.CUSTOMER_PORTAL}>
          <MenuItem>
            <ListItemIcon>
              <SubscriptionsIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText>
              <Typography sx={{ marginTop: -0.5 }} variant='body2'>
                Manage Subscription
              </Typography>
            </ListItemText>
          </MenuItem>
        </Link>
      ) : (
        <MenuItem onClick={redirectToSubscription}>
          <ListItemIcon>
            <SubscriptionsIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>
            <Typography sx={{ marginTop: -0.5 }} variant='body2'>
              Subscribe
            </Typography>
          </ListItemText>
        </MenuItem>
      )}
      <MenuItem onClick={signOut}>
        <ListItemIcon>
          <LogoutIcon fontSize='small' />
        </ListItemIcon>
        <ListItemText>
          <Typography sx={{ marginTop: -0.5 }} variant='body2'>
            Sign Out
          </Typography>
        </ListItemText>
      </MenuItem>
    </MenuList>
  );
}

function UserBubbleButton({ isLoading }: { isLoading: boolean }) {
  const { user } = useAuth();
  const photoUrl = user?.photoURL;

  return user ? (
    <Button
      id='test'
      startIcon={<MenuIcon />}
      sx={{ borderRadius: 6, paddingRight: '6px', img: { borderRadius: '100%' } }}
      variant='contained'
    >
      {isLoading ? (
        <CircularProgress color='success' size={35} />
      ) : photoUrl ? (
        <Image
          alt='user icon'
          priority
          ratio={1}
          sizes='35px'
          src={user.photoURL}
          sx={{ width: 35, img: { objectFit: 'cover' } }}
        />
      ) : (
        <AccountCircleIcon fontSize='large' />
      )}
    </Button>
  ) : null;
}
