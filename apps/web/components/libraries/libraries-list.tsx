import { Box, Button, Paper, SxProps, Typography } from '@mui/material';
import { LibrariesProvider, useLibraries } from 'web/contexts/libraries-context';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Libraries } from 'data/library';
import { LibraryPickerTrigger } from './library-picker-trigger';

interface Props {}

const CARD_SX: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 150,
  width: 150,
  marginRight: '7px',
};

export function LibrariesList({}: Props) {
  const { isLoading, libraries } = useLibraries();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
        gridGap: 16,
      }}
    >
      {libraries.map(([key, library]) => (
        <Paper elevation={2} sx={{ ...CARD_SX }}>
          <Box key={key}>Decide whether to save mediaItems to Firestore or always fetch them.</Box>
          <Button startIcon={<AddPhotoAlternateIcon />} variant='text'>
            Manage
          </Button>
        </Paper>
      ))}
      <LibraryPickerTrigger>
        <Paper elevation={1} sx={{ ...CARD_SX }}>
          <Button startIcon={<AddPhotoAlternateIcon />} variant='text'>
            Add library
          </Button>
        </Paper>
      </LibraryPickerTrigger>
    </Box>
  );
}
