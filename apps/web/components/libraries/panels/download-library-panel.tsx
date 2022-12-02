import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  SxProps,
  Typography,
} from '@mui/material';
import { DirectoryHandle, useLocalFilesystem } from 'ui/hooks';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LibraryTaskStatus } from 'data/library';
import { MenuTrigger } from 'ui/components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { UseLibraryDownloadResult } from 'web/hooks/use-library-download';
import { formatDate } from 'ui/utils';

const GRID: SxProps = {
  display: 'grid',
  gridGap: 4,
  gridTemplateColumns: '1fr 3.5rem 51px 51px',
  alignItems: 'center',
};

type Props = Pick<UseLibraryDownloadResult, 'actions' | 'directoryHandle' | 'getDirectoryHandle' | 'libraryDownload'>;

export function DownloadLibraryPanel({ actions, directoryHandle, getDirectoryHandle, libraryDownload }: Props) {
  const isRunning = libraryDownload?.status === LibraryTaskStatus.running;
  const isComplete = libraryDownload?.status === LibraryTaskStatus.complete;
  const isEmpty = !libraryDownload;

  return (
    <Paper elevation={1} sx={{}}>
      <Box sx={{ ...GRID, paddingBottom: 2 }}>
        <Typography sx={{ flex: 1 }} variant='h6'>
          {directoryHandle?.name ?? 'No folder selected'}
        </Typography>

        <Button
          disabled={isRunning}
          onClick={getDirectoryHandle}
          sx={{ gridColumn: '2/5' }}
          variant={directoryHandle ? 'outlined' : 'contained'}
        >
          {directoryHandle ? 'Change folder' : 'Select a folder'}
        </Button>
      </Box>
      <Box
        sx={{
          ...GRID,
          pointerEvents: directoryHandle ? 'all' : 'none',
          opacity: directoryHandle ? 1 : 0.5,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <LinearProgress
            value={isComplete ? 100 : Math.max(5, Math.min(50, (libraryDownload?.count ?? 0) / 10000))}
            variant={isRunning ? 'indeterminate' : 'determinate'}
          />
          <Typography sx={{ position: 'absolute', inset: '0 0 -5 0' }} variant='caption'>
            {formatDate(libraryDownload?.updated, 'MMM d, yyyy •  HH:mm:ss')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -0.5 }}>
          <Typography variant='body1'>{libraryDownload?.count}</Typography>
        </Box>
        <Box>
          <ActionButton actions={actions} libraryDownload={libraryDownload} />
        </Box>

        <Box sx={{ position: 'relative', pointerEvents: isEmpty ? 'none' : 'all', opacity: isEmpty ? 0.5 : 1 }}>
          <MenuTrigger
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            trigger={
              <IconButton sx={{ color: 'primary.main' }}>
                <MoreVertIcon fontSize='large' />
              </IconButton>
            }
          >
            <MenuList>
              <MenuItem onClick={() => actions.destroy()}>
                <ListItemIcon>
                  <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText>Destroy records</ListItemText>
              </MenuItem>
            </MenuList>
          </MenuTrigger>
        </Box>
      </Box>
    </Paper>
  );
}

function ActionButton({ actions, libraryDownload }: Pick<Props, 'actions' | 'libraryDownload'>) {
  switch (libraryDownload?.status) {
    case LibraryTaskStatus.complete:
      return (
        <CheckCircleOutlineIcon
          fontSize='large'
          sx={{ color: 'var(--color-jade-green)', marginTop: 0.5, marginLeft: 1 }}
        />
      );

    case LibraryTaskStatus.running:
      return (
        <IconButton onClick={() => actions.pause()}>
          <PauseCircleOutlineIcon fontSize='large' sx={{ color: 'var(--color-gentian-blue-metallic)' }} />
        </IconButton>
      );

    default:
      return (
        <IconButton onClick={() => actions.start()}>
          <PlayCircleOutlineIcon fontSize='large' sx={{ color: 'var(--color-gentian-blue-metallic)' }} />
        </IconButton>
      );
  }
}
