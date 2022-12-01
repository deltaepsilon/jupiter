import {
  Box,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LibraryImportStatus } from 'data/library';
import { MenuTrigger } from 'ui/components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { UseLibraryImportResult } from 'web/hooks/use-library-import';
import { formatDate } from 'ui/utils';

interface Props {
  actions: UseLibraryImportResult['actions'];
  libraryImport: UseLibraryImportResult['libraryImport'];
}

export function DownloadLibraryPanel({ actions, libraryImport }: Props) {
  const isRunning = libraryImport?.status === LibraryImportStatus.running;
  const isComplete = libraryImport?.status === LibraryImportStatus.complete;
  const isEmpty = !libraryImport;

  return (
    <Paper
      elevation={1}
      sx={{ display: 'grid', gridGap: 4, gridTemplateColumns: '1fr 3.5rem 51px 51px', alignItems: 'center' }}
    >
      <Box sx={{ position: 'relative' }}>
        <LinearProgress
          value={isComplete ? 100 : Math.max(5, Math.min(50, (libraryImport?.count ?? 0) / 10000))}
          variant={isRunning ? 'indeterminate' : 'determinate'}
        />
        <Typography sx={{ position: 'absolute', inset: '0 0 -5 0' }} variant='caption'>
          {formatDate(libraryImport?.updated, 'MMM d, yyyy •  HH:mm:ss')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -0.5 }}>
        <Typography variant='body1'>{libraryImport?.count}</Typography>
      </Box>
      <Box>
        <ActionButton actions={actions} libraryImport={libraryImport} />
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
    </Paper>
  );
}

function ActionButton({ actions, libraryImport }: Props) {
  switch (libraryImport?.status) {
    case LibraryImportStatus.complete:
      return (
        <CheckCircleOutlineIcon
          fontSize='large'
          sx={{ color: 'var(--color-jade-green)', marginTop: 0.5, marginLeft: 1 }}
        />
      );

    case LibraryImportStatus.running:
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
