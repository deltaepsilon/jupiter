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
import { DownloadState, getStateFlags, getTotals } from 'data/daemon';

import BackupTableIcon from '@mui/icons-material/BackupTable';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DirectoryPicker } from 'web/components/daemon';
import DownloadingIcon from '@mui/icons-material/Downloading';
import FolderIcon from '@mui/icons-material/Folder';
import { MenuTrigger } from 'ui/components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { UseDirectoryResult } from 'web/contexts';
import { UseLibraryDownloadResult } from 'web/hooks/use-library-download';
import { formatDate } from 'ui/utils';

const GRID: SxProps = {
  display: 'grid',
  gridGap: 4,
  gridTemplateColumns: '1fr 3.5rem 51px 51px',
  alignItems: 'center',
};

type Props = {
  actions: UseLibraryDownloadResult['actions'];
  directory: UseDirectoryResult['directory'];
  downloadState: UseLibraryDownloadResult['downloadState'];
  libraryId: string;
};

export function DownloadLibraryPanel({ actions, directory, downloadState, libraryId }: Props) {
  const { isRunning } = getStateFlags(downloadState);
  const { downloadedCount, mediaItemsCount } = getTotals(downloadState);
  const isEmpty = mediaItemsCount === 0;

  return (
    <Paper elevation={1} sx={{}}>
      <Box sx={{ ...GRID, paddingBottom: 2 }}>
        <Typography sx={{ flex: 1 }} variant='body2'>
          {directory ?? 'No folder selected'}
        </Typography>

        <DirectoryPicker directory={directory} disabled={isRunning} libraryId={libraryId} sx={{ gridColumn: '3/5' }}>
          <Button disabled={isRunning} variant={directory ? 'outlined' : 'contained'}>
            Pick Folder
          </Button>
        </DirectoryPicker>
      </Box>
      <Box
        sx={{
          ...GRID,
          pointerEvents: directory ? 'all' : 'none',
          opacity: directory ? 1 : 0.5,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <LinearProgress value={downloadState.filesystemProgress * 100} variant='determinate' />
          <Box sx={{ position: 'absolute', inset: '1px 0 -5px 0', display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ textTransform: 'capitalize' }} variant='caption'>
              {downloadState.state}
            </Typography>
            <Typography variant='caption'>{formatDate(downloadState?.updated, 'MMM d •  HH:mm:ss')}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -0.5 }}>
          <Typography variant='body1'>
            {downloadedCount} / {mediaItemsCount}
          </Typography>
        </Box>
        <Box>
          <ActionButton actions={actions} downloadState={downloadState} />
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

        <FoldersProgress downloadState={downloadState} />
      </Box>
    </Paper>
  );
}

function FoldersProgress({ downloadState }: { downloadState: DownloadState }) {
  return (
    <Box sx={{ gridColumn: '1/-1' }}>
      {downloadState.folders.map((folder) => (
        <Box key={folder.folder} sx={{ display: 'grid', gridTemplateColumns: '1fr 53px', gridGap: 16, paddingY: '4px' }}>
          <Box sx={{ position: 'relative', display: 'grid', gridTemplateColumns: '2rem 1fr', alignItems: 'center' }}>
            <FolderIcon />
            <Box sx={{ position: 'relative', top: -5 }}>
              <LinearProgress value={(folder.downloadedCount / folder.mediaItemsCount) * 100} variant='determinate' />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                inset: '10px 0px 5px 30px',
                display: 'grid',
                gridTemplateColumns: '1fr 4.5rem 6rem 3.5rem',
              }}
            >
              <Typography variant='caption'>{folder.folder}</Typography>
              <Typography variant='caption'>Indexed: {folder.indexedCount}</Typography>
              <Typography variant='caption'>Downloaded: {folder.downloadedCount}</Typography>
              <Typography variant='caption'>Media: {folder.mediaItemsCount}</Typography>
            </Box>
          </Box>

          <Box sx={{ textAlign: 'center', color: 'var(--color-mid-gray)' }}>
            <FolderState folder={folder} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function FolderState({ folder }: { folder: DownloadState['folders'][0] }) {
  switch (folder.state) {
    case 'idle':
      return <PauseCircleOutlineIcon />;
    case 'indexing':
      return <BackupTableIcon />;
    case 'downloading':
      return <DownloadingIcon />;
    case 'complete':
      return <CheckCircleOutlineIcon />;
  }
}

function ActionButton({ actions, downloadState }: Pick<Props, 'actions' | 'downloadState'>) {
  const { isComplete, isRunning } = getStateFlags(downloadState);

  switch (true) {
    case isRunning:
      return (
        <IconButton onClick={() => actions.pause()}>
          <PauseCircleOutlineIcon fontSize='large' sx={{ color: 'var(--color-gentian-blue-metallic)' }} />
        </IconButton>
      );

    case isComplete:
      return (
        <CheckCircleOutlineIcon
          fontSize='large'
          sx={{ color: 'var(--color-jade-green)', marginTop: 0.5, marginLeft: 1 }}
        />
      );

    default:
      return (
        <IconButton onClick={async () => actions.start()}>
          <PlayCircleOutlineIcon fontSize='large' sx={{ color: 'var(--color-gentian-blue-metallic)' }} />
        </IconButton>
      );
  }
}
