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
  Typography,
} from '@mui/material';
import { MAX_UNSUBCRIBED_COUNT } from 'data/library';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LibraryTaskStatus } from 'data/library';
import { MediaItemsDrawer } from '../drawers/media-items-drawer';
import { MenuTrigger } from 'ui/components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import TableChartIcon from '@mui/icons-material/TableChart';
import { UseLibraryImportResult } from 'web/hooks/use-library-import';
import { formatDate } from 'ui/utils';
import { useAuth } from 'ui/contexts';

interface Props {
  actions: UseLibraryImportResult['actions'];
  libraryId: string;
  libraryImport: UseLibraryImportResult['libraryImport'];
}

export function ImportLibraryPanel({ actions, libraryId, libraryImport }: Props) {
  const { isSubscriber } = useAuth();
  const isRunning = libraryImport?.status === LibraryTaskStatus.running;
  const isComplete = libraryImport?.status === LibraryTaskStatus.complete;
  const isEmpty = !libraryImport;

  return (
    <Paper
      elevation={1}
      sx={{ display: 'grid', gridGap: 4, gridTemplateColumns: '1fr 3.5rem 51px 51px', alignItems: 'center' }}
    >
      {!isSubscriber && (
        <Box sx={{ gridColumn: '1/-1' }}>
          You are utilizing the Free Tier, which is limited to ~{MAX_UNSUBCRIBED_COUNT} media items. <br /> Subscribe to
          unlock your unlimited library.
        </Box>
      )}
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
        <MediaItemsDrawer libraryId={libraryId}>
          <Typography
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
            variant='body1'
          >
            {libraryImport?.count}
          </Typography>
        </MediaItemsDrawer>
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
          {isComplete && (
            <MenuItem>
              <ListItemIcon onClick={() => actions.start}>
                <PlayCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText>Import new media</ListItemText>
            </MenuItem>
          )}
          <MediaItemsDrawer libraryId={libraryId}>
            <MenuItem>
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText>View Imports</ListItemText>
            </MenuItem>
          </MediaItemsDrawer>
          <MenuItem onClick={() => actions.destroy()}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText>Start over</ListItemText>
          </MenuItem>
        </MenuTrigger>
      </Box>
    </Paper>
  );
}

const LIBRARY_IMPORT_STALE_MILLIS = 1000 * 60 * 10;

function ActionButton({ actions, libraryImport }: Pick<Props, 'actions' | 'libraryImport'>) {
  const isStale = libraryImport && libraryImport?.updated.getTime() < Date.now() - LIBRARY_IMPORT_STALE_MILLIS;
  const libraryImportStatus =
    isStale && libraryImport?.status === LibraryTaskStatus.complete ? LibraryTaskStatus.idle : libraryImport?.status;

  switch (libraryImportStatus) {
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
