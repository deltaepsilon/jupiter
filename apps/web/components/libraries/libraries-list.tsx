import { Box, Button, ListItemIcon, ListItemText, MenuItem, MenuList, Paper, SxProps, Typography } from '@mui/material';
import { Container, Link, MediaItemImage, MenuTrigger } from 'ui/components';
import { useEffect, useState } from 'react';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LaunchIcon from '@mui/icons-material/Launch';
import { Library } from 'data/library';
import { LibraryPickerTrigger } from './library-picker-trigger';
import NextImage from 'next/image';
import PhotoIcon from '@mui/icons-material/Photo';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SettingsIcon from '@mui/icons-material/Settings';
import { WEB } from 'data/web';
import { useLibraries } from 'web/contexts/libraries-context';

interface Props {}

const CARD_SX: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: 200,
  width: 200,
  padding: 0,
  overflow: 'hidden',
  marginRight: '7px',
  '&:hover': {
    borderColor: 'var(--color-orange)',
    boxShadow: '4px 4px 0px 2px var(--color-orange)',
    cursor: 'pointer',
  },
};

const GOOGLE_IMAGE_SCALE = 0.8;
const GOOGLE_IMAGE_HEIGHT = 46 * GOOGLE_IMAGE_SCALE;
const GOOGLE_IMAGE_WIDTH = 191 * GOOGLE_IMAGE_SCALE;

export function LibrariesList({}: Props) {
  const { libraries } = useLibraries();

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 660 }}>
      <Typography sx={{ alignSelf: 'start', marginBottom: 4 }} variant='h4'>
        Connected libraries
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
          gridGap: 16,
          color: 'var(--color-gentian-blue-metallic)',
        }}
      >
        {libraries.map(([libraryKey, library]) => (
          <LibraryItem key={libraryKey} library={library} libraryKey={libraryKey} />
        ))}
        <LibraryPickerTrigger>
          <Paper elevation={1} sx={{ ...CARD_SX }}>
            <Button startIcon={<AddPhotoAlternateIcon />} variant='text'>
              Add Library
            </Button>
            <NextImage
              alt='sign in with google'
              height={GOOGLE_IMAGE_HEIGHT}
              priority
              src='/icons/btn_google_signin_dark_normal_web@2x.png'
              width={GOOGLE_IMAGE_WIDTH}
            />
          </Paper>
        </LibraryPickerTrigger>
      </Box>
    </Container>
  );
}

function LibraryItem({ library, libraryKey }: { library: Library; libraryKey: string }) {
  const [isBrokenImage, setIsBrokenImage] = useState(false);
  const { refreshLibrary } = useLibraries();
  const mediaItem = library.mediaItems?.[0];
  const baseUrl = mediaItem?.baseUrl;

  useEffect(() => {
    setIsBrokenImage(false);
  }, [baseUrl]);

  return (
    <Paper elevation={1} sx={{ ...CARD_SX }}>
      <Link href={WEB.ROUTES.LIBRARY(libraryKey)} key={libraryKey}>
        {isBrokenImage ? (
          <PhotoIcon sx={{ color: '', width: 100, height: 100 }} />
        ) : mediaItem ? (
          <MediaItemImage
            height={200}
            mediaItem={mediaItem}
            onError={() => {
              setIsBrokenImage(true);
              refreshLibrary(libraryKey, true);
            }}
            priority
            sx={{ position: 'absolute', inset: 0 }}
            width={200}
          />
        ) : (
          <PhotoLibraryIcon sx={{ color: '', width: 100, height: 100 }} />
        )}
      </Link>

      <LibraryMenu
        libraryKey={libraryKey}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          textTransform: 'capitalize',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          paddingX: 1,
          paddingY: '2px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{}} variant='subtitle2'>
            {library.name}
          </Typography>
          <Box sx={{ position: 'relative', top: 3 }}>
            <SettingsIcon />
          </Box>
        </Box>
      </LibraryMenu>
    </Paper>
  );
}

function LibraryMenu({
  children,
  libraryKey,
  sx = {},
}: {
  children: React.ReactNode;
  libraryKey: string;
  sx?: SxProps;
}) {
  const { removeLibrary } = useLibraries();

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <MenuTrigger anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }} trigger={children}>
        <Link button href={WEB.ROUTES.LIBRARY(libraryKey)} key={libraryKey}>
          <MenuItem>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText>Open library</ListItemText>
          </MenuItem>
        </Link>
        <MenuItem onClick={() => removeLibrary(libraryKey)}>
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText>Delete library</ListItemText>
        </MenuItem>
      </MenuTrigger>
    </Box>
  );
}
