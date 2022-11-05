import { Button, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { MenuTrigger, useMenuTrigger } from 'ui/components';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NextImage from 'next/image';
import { useAuth } from 'ui/hooks';

export function AppUserBubble() {
  const { user } = useAuth();
  const photoUrl = user?.photoURL;

  return user ? (
    <MenuTrigger anchorOrigin={{ horizontal: 'right', vertical: 50 }} trigger={<UserBubbleButton />}>
      <UserBubbleList />
    </MenuTrigger>
  ) : null;
}

function UserBubbleList() {
  const { signOut } = useAuth();
  const { close } = useMenuTrigger();

  return (
    <MenuList onClick={close}>
      <MenuItem onClick={signOut}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
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
        <NextImage alt='user icon' height='35' src={user.photoURL} width='35' />
      ) : (
        <AccountCircleIcon fontSize='large' />
      )}
    </Button>
  ) : null;
}
