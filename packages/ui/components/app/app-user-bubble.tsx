import { Button, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from '@mui/material';
import { Image, Link, MenuTrigger, useMenuTrigger } from 'ui/components';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsIcon from '@mui/icons-material/Collections';
import { DesktopAppDownloadsDrawer } from 'web/components/daemon';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NextImage from 'next/image';
import { WEB } from 'data/web';
import { useAuth } from 'ui/contexts';
import { useRouter } from 'next/router';

export function AppUserBubble() {
  const { user } = useAuth();

  return user ? (
    <MenuTrigger anchorOrigin={{ horizontal: 'right', vertical: 50 }} trigger={<UserBubbleButton />}>
      <UserBubbleList />
    </MenuTrigger>
  ) : null;
}

function UserBubbleList() {
  const { signOut } = useAuth();
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

function UserBubbleButton() {
  const { user } = useAuth();
  const photoUrl = user?.photoURL;

  return user ? (
    <Button
      id='test'
      startIcon={<MenuIcon />}
      sx={{ borderRadius: 6, paddingRight: '6px', img: { borderRadius: '100%' } }}
      variant='contained'
    >
      {photoUrl ? (
        <Image alt='user icon' ratio={1} src={user.photoURL} sx={{ width: 35, img: { objectFit: 'cover' } }} />
      ) : (
        <AccountCircleIcon fontSize='large' />
      )}
    </Button>
  ) : null;
}
