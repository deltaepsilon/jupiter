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
import { DownloadState, ProgressMessageData, getStateFlags, getTotals } from 'data/daemon';
import { HiddenScroll, MenuTrigger, useScrollToBottom } from 'ui/components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DirectoryPicker } from 'web/components/daemon';
import DownloadingIcon from '@mui/icons-material/Downloading';
import { FolderDrawer } from '../drawers';
import FolderIcon from '@mui/icons-material/Folder';
import { MessageType } from 'data/daemon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import SoapIcon from '@mui/icons-material/Soap';
import SyncIcon from '@mui/icons-material/Sync';
import { UseDirectoryResult } from 'web/contexts';
import { UseLibraryDownloadResult } from 'web/hooks/use-library-download';
import { formatDate } from 'ui/utils';
import { progressMessageDataSchema } from 'data/daemon';
import { useDaemon } from 'web/contexts';

const GRID: SxProps = {
  display: 'grid',
  gridGap: 4,
  gridTemplateColumns: '1fr 8rem 51px 51px',
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
  const { emptyFolderProgress, progressMapsByFolder } = useFolderProgress();
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 1 }}>
          <Typography variant='body1'>
            {downloadedCount} / {mediaItemsCount}
          </Typography>
        </Box>
        <Box>
          <ActionButton actions={actions} downloadState={downloadState} emptyFolderProgress={emptyFolderProgress} />
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
              <MenuItem onClick={() => emptyFolderProgress()}>
                <ListItemIcon>
                  <SoapIcon />
                </ListItemIcon>
                <ListItemText>Clean up progress</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  emptyFolderProgress();
                  actions.restartIngest();
                }}
              >
                <ListItemIcon>
                  <ReplayIcon />
                </ListItemIcon>
                <ListItemText>Restart ingest</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  emptyFolderProgress();
                  actions.destroy();
                }}
              >
                <ListItemIcon>
                  <DeleteForeverIcon />
                </ListItemIcon>
                <ListItemText>Start over</ListItemText>
              </MenuItem>
            </MenuList>
          </MenuTrigger>
        </Box>

        <FoldersProgress downloadState={downloadState} progressMapsByFolder={progressMapsByFolder} />
      </Box>
    </Paper>
  );
}

type ProgressMap = Record<string, ProgressMessageData>;
type ProgressMapByFolder = Map<string, ProgressMap>;
function getDefaultProgressMap() {
  return {} as ProgressMap;
}

function useFolderProgress() {
  const [progressMapsByFolder, setProgressMapsByFolder] = useState<ProgressMapByFolder>(new Map());
  const { registerHandler } = useDaemon();
  const emptyFolderProgress = useCallback(() => setProgressMapsByFolder(new Map()), []);

  useEffect(() => {
    registerHandler({
      type: MessageType.progress,
      handler: (message) => {
        const data = progressMessageDataSchema.parse(message.payload?.data);
        const existing = progressMapsByFolder.get(data.folder) ?? getDefaultProgressMap();

        existing[data.id] = data;

        setProgressMapsByFolder((prev) => new Map(prev).set(data.folder, existing));
      },
    });
  }, [progressMapsByFolder, registerHandler]);

  return { emptyFolderProgress, progressMapsByFolder };
}

function FoldersProgress({
  downloadState,
  progressMapsByFolder,
}: {
  downloadState: DownloadState;
  progressMapsByFolder: ProgressMapByFolder;
}) {
  const folderSummaries = useMemo(
    () =>
      downloadState.folderSummaries
        .filter((f) => f.indexedCount || f.mediaItemsCount)
        .sort((a, b) => (a.folder < b.folder ? 1 : -1)),
    [downloadState]
  );

  return (
    <Box sx={{ gridColumn: '1/-1' }}>
      {folderSummaries.map((folderSummary) => {
        const progressMap = progressMapsByFolder.get(folderSummary.folder) ?? getDefaultProgressMap();

        return (
          <FolderDrawer folder={folderSummary.folder} key={folderSummary.folder}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 53px',
                gridGap: 16,
                paddingY: '4px',
                cursor: 'pointer',
                '&:hover [data-folder-icon]': {
                  color: 'var(--color-jade-green)',
                },
              }}
            >
              <Box
                sx={{ position: 'relative', display: 'grid', gridTemplateColumns: '2rem 1fr', alignItems: 'center' }}
              >
                <FolderIcon data-folder-icon />
                <Box sx={{ position: 'relative', top: -5 }}>
                  <LinearProgress
                    value={(folderSummary.downloadedCount / folderSummary.mediaItemsCount) * 100}
                    variant='determinate'
                  />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    inset: '10px 0px 5px 30px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 4.5rem 6rem 3.5rem',
                    userSelect: 'none',
                  }}
                >
                  <Typography variant='caption'>{folderSummary.folder}</Typography>
                  <Typography variant='caption'>Indexed: {folderSummary.indexedCount}</Typography>
                  <Typography variant='caption'>Downloaded: {folderSummary.downloadedCount}</Typography>
                  <Typography variant='caption'>Media: {folderSummary.mediaItemsCount}</Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: 'center', color: 'var(--color-mid-gray)' }}>
                <FolderState folderSummary={folderSummary} progressMap={progressMap} />
              </Box>

              <Box>
                <FolderProgress progressMap={progressMap} />
              </Box>
            </Box>
          </FolderDrawer>
        );
      })}
    </Box>
  );
}

function FolderState({
  progressMap,
  folderSummary,
}: {
  progressMap: ProgressMap;
  folderSummary: DownloadState['folderSummaries'][0];
}) {
  switch (folderSummary.state) {
    case 'idle':
      return <PauseCircleOutlineIcon />;
    case 'indexing':
      return <SyncIcon />;
    case 'downloading':
      return <DownloadingIcon />;
    case 'complete':
      return <CheckCircleOutlineIcon />;
  }
}

function ActionButton({
  actions,
  downloadState,
  emptyFolderProgress,
}: Pick<Props, 'actions' | 'downloadState'> & { emptyFolderProgress: () => void }) {
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
        <IconButton
          onClick={async () => {
            emptyFolderProgress();
            actions.start();
          }}
        >
          <ReplayIcon fontSize='large' sx={{ color: 'var(--color-jade-green)' }} />
        </IconButton>
      );

    default:
      return (
        <IconButton onClick={async () => actions.start()}>
          <PlayCircleOutlineIcon fontSize='large' sx={{ color: 'var(--color-gentian-blue-metallic)' }} />
        </IconButton>
      );
  }
}

function FolderProgress({ progressMap }: { progressMap: ProgressMap }) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const progressMapFlat = Object.values(progressMap).filter((p) => p.progressEvent.progress !== 1);

  useScrollToBottom(scrollableRef, [progressMapFlat]);

  return progressMapFlat.length ? (
    <Box sx={{ position: 'relative', height: 197 }}>
      <HiddenScroll
        ref={scrollableRef}
        sx={{
          position: 'absolute',
          inset: '0rem -1rem 0rem 1rem',
          padding: 2,
          userSelect: 'none',
          background: 'var(--color-extralight-gray)',
        }}
      >
        {progressMapFlat.map(({ id, filename, progressEvent }) => (
          <Box key={id}>
            <LinearProgress color='info' value={(progressEvent?.progress ?? 0) * 100} variant='determinate' />
            <Box
              sx={{ position: 'relative', top: -2, height: '1.5rem', display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant='caption'>{filename}</Typography>
              {progressEvent.progress && (
                <Typography variant='caption'>
                  {bitsToKb(progressEvent.total || 0)} kb &nbsp;&nbsp; {Math.round(progressEvent.progress * 100)}%
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </HiddenScroll>
    </Box>
  ) : null;
}

function bitsToKb(bits: number) {
  return Math.round(bits / 1024 / 8).toLocaleString();
}
