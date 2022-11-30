import { Box, Button, Paper, SxProps, Typography } from '@mui/material';
import { Container, Link, MediaItemImage } from 'ui/components';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { LibraryPickerTrigger } from './library-picker-trigger';
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
    borderColor: 'var(--color-acid-green)',
    boxShadow: '4px 4px 0px 2px var(--color-acid-green)',
    cursor: 'pointer',
  },
};

export function LibrariesList({}: Props) {
  const { libraries } = useLibraries();

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 660 }}>
      <Typography sx={{ alignSelf: 'start', marginBottom: 4 }} variant='h4'>
        Google Photos connected libraries
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
          gridGap: 16,
          color: 'var(--color-gentian-blue-metallic)',
        }}
      >
        {libraries.map(([key, library]) => {
          const mediaItem = library.mediaItems?.[0];

          return (
            <Link href={WEB.ROUTES.LIBRARY(key)} key={key}>
              <Paper elevation={2} sx={{ ...CARD_SX }}>
                {mediaItem ? (
                  <MediaItemImage
                    height={200}
                    mediaItem={mediaItem}
                    sx={{ position: 'absolute', inset: 0 }}
                    width={200}
                  />
                ) : (
                  <PhotoLibraryIcon sx={{ color: '', width: 100, height: 100 }} />
                )}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',

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
                  <Typography sx={{}} variant='subtitle2'>
                    {library.name}
                  </Typography>
                  <SettingsIcon />
                </Box>
              </Paper>
            </Link>
          );
        })}
        <LibraryPickerTrigger>
          <Paper elevation={1} sx={{ ...CARD_SX }}>
            <Button startIcon={<AddPhotoAlternateIcon />} variant='text'>
              Add Library
            </Button>
          </Paper>
        </LibraryPickerTrigger>
      </Box>
    </Container>
  );
}
