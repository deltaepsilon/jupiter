import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  SxProps,
  Typography,
} from '@mui/material';
import { ChildGraphic, HiddenScroll, LastChildGraphic, MenuTrigger, useScrollToBottom } from 'ui/components';
import { DownloadState, FolderSummary, YearStats, getStateFlags, getTotals, yearStatsSchema } from 'data/daemon';
import {
  FolderProgressProvider,
  ProgressMap,
  UseDirectoryResult,
  getDefaultProgressMap,
  useFolderProgress,
} from 'web/contexts';
import { useMemo, useRef, useState } from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DirectoryPicker } from 'web/components/daemon';
import { FolderDrawer } from '../drawers';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import SoapIcon from '@mui/icons-material/Soap';
import { UseLibraryDownloadResult } from 'web/hooks/use-library-download';

const STATS_EMPHASIZED: SxProps = { fontWeight: '700 !important', textDecoration: 'underline' };

type Props = {
  actions: UseLibraryDownloadResult['actions'];
  directory: UseDirectoryResult['directory'];
  downloadState: UseLibraryDownloadResult['downloadState'];
  libraryId: string;
};

export function DownloadLibraryPanel({ actions, directory, downloadState, libraryId }: Props) {
  const { isRunning } = getStateFlags(downloadState);
  const { downloadedCount, indexedCount, mediaItemsCount } = getTotals(downloadState);
  const isEmpty = mediaItemsCount === 0;

  return (
    <FolderProgressProvider>
      <Paper elevation={1} sx={{}}>
        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr  3rem 3rem',
            gridGap: 8,
            paddingBottom: 2,

            '> p': {
              textAlign: 'right',
            },
          }}
        >
          <Box>
            <DirectoryPicker
              directory={directory}
              disabled={isRunning}
              libraryId={libraryId}
              sx={{ gridColumn: '3/5' }}
            >
              <Button disabled={isRunning} variant={directory ? 'outlined' : 'contained'}>
                Pick Folder
              </Button>
            </DirectoryPicker>
          </Box>

          <Box>
            <ActionButton actions={actions} downloadState={downloadState} />
          </Box>
          <Box>
            <DownloadMenu actions={actions} isEmpty={isEmpty} />
          </Box>
        </Box>

        <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 60px 60px 60px' }}>
          <Box />
          <Typography variant='body2'>Import</Typography>
          <Typography variant='body2'>Index</Typography>
          <Typography variant='body2'>Download</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FolderIcon />
          <Typography sx={{ paddingLeft: 1 }}>{directory ?? 'No folder selected'}</Typography>

          <Box
            sx={{
              flex: 1,
              display: 'grid',
              gridGap: 8,
              gridTemplateColumns: '79px 66px 66px',
              textAlign: 'right',
              position: 'relative',
              top: 2,
            }}
          >
            <Typography sx={STATS_EMPHASIZED} variant='body2'>
              {mediaItemsCount}
            </Typography>
            <Typography sx={STATS_EMPHASIZED} variant='body2'>
              {indexedCount}
            </Typography>
            <Typography sx={STATS_EMPHASIZED} variant='body2'>
              {downloadedCount}
            </Typography>
          </Box>
        </Box>

        <FoldersProgressTree downloadState={downloadState} />
      </Paper>
    </FolderProgressProvider>
  );
}

function ActionButton({ actions, downloadState }: Pick<Props, 'actions' | 'downloadState'>) {
  const { emptyFolderProgress } = useFolderProgress();
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

function DownloadMenu({ actions, isEmpty }: { actions: Props['actions']; isEmpty: boolean }) {
  const { emptyFolderProgress } = useFolderProgress();

  return (
    <Box sx={{ position: 'relative', pointerEvents: isEmpty ? 'none' : 'all', opacity: isEmpty ? 0.5 : 1 }}>
      <MenuTrigger
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        trigger={
          <IconButton sx={{ color: 'primary.main' }}>
            <MoreVertIcon fontSize='large' />
          </IconButton>
        }
      >
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
      </MenuTrigger>
    </Box>
  );
}

function FoldersProgressTree({ downloadState }: { downloadState: DownloadState }) {
  const folderSummariesByYear = useMemo(() => {
    const summariesMap = downloadState.folderSummaries
      .filter((f) => f.indexedCount || f.mediaItemsCount)
      .sort((a, b) => (a.folder < b.folder ? 1 : -1))
      .reduce((acc, folderSummary) => {
        const year = folderSummary.folder.split('/').shift() || 'missing';

        if (!acc[year]) {
          acc[year] = [];
        }

        acc[year].push(folderSummary);

        return acc;
      }, {} as Record<string, FolderSummary[]>);

    return Object.entries(summariesMap).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [downloadState]);

  return (
    <Box>
      {folderSummariesByYear.map(([year, folderSummaries], i) => (
        <YearSummary
          folderSummaries={folderSummaries}
          isFirst={i === 0}
          isLast={i === folderSummariesByYear.length - 1}
          key={year}
          year={year}
        />
      ))}
    </Box>
  );
}

function YearSummary({
  folderSummaries,
  isFirst,
  isLast,
  year,
}: {
  folderSummaries: FolderSummary[];
  isFirst: boolean;
  isLast: boolean;
  year: string;
}) {
  const { progressMapsByFolder } = useFolderProgress();
  const yearStats = useYearStats({ folderSummaries });
  const [isOpen, setIsOpen] = useState(false);
  const statsSx = useMemo(() => (isOpen ? STATS_EMPHASIZED : {}), [isOpen]);
  const isPadded = isOpen || isFirst;

  return (
    <Box
      onClick={() => setIsOpen((i) => !i)}
      sx={{
        cursor: 'pointer',
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '24px 1fr',
      }}
    >
      {isLast ? (
        <LastChildGraphic
          sx={{
            height: isPadded ? '100%' : '32px',
            '[data-child-graphic-vertical]': { height: isPadded ? '33%' : '50%' },
          }}
        />
      ) : (
        <ChildGraphic
          sx={{
            height: isPadded ? '100%' : '32px',
            '[data-child-graphic-horizontal]': { height: isPadded ? '40px' : '50%' },
          }}
        />
      )}
      <Box
        sx={{
          display: 'grid',
          columnGap: 1,
          gridTemplateColumns: '2rem 1fr 222px',
          paddingTop: isPadded ? 4 : 1,
        }}
      >
        <Typography
          sx={{
            lineHeight: '12px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={year}
          variant='body2'
        >
          {year}
        </Typography>
        <LinearProgress
          sx={{ marginTop: 1 }}
          value={(yearStats.downloadedCount / yearStats.mediaItemsCount) * 100}
          variant='determinate'
        />
        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            gridGap: 8,
            gridTemplateColumns: '1fr 1fr 1fr',
            paddingRight: 1,
            p: { textAlign: 'right' },
          }}
        >
          <Typography sx={statsSx} variant='body2'>
            {yearStats.mediaItemsCount}
          </Typography>
          <Typography sx={statsSx} variant='body2'>
            {yearStats.indexedCount}
          </Typography>
          <Typography sx={statsSx} variant='body2'>
            {yearStats.downloadedCount}
          </Typography>
        </Box>
        {isOpen && (
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              gridColumn: '1/-1',
              paddingBottom: 4,
            }}
          >
            {folderSummaries.map((folderSummary, i) => {
              const isLast = i === folderSummaries.length - 1;

              return (
                <Box
                  key={folderSummary.id}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '24px 1fr',
                  }}
                >
                  {isLast ? (
                    <LastChildGraphic />
                  ) : (
                    <ChildGraphic sx={{ height: '100%', '[data-child-graphic-horizontal]': { height: '16px' } }} />
                  )}
                  <Box>
                    <FolderSummaryRow folderSummary={folderSummary} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

function useYearStats({ folderSummaries }: { folderSummaries: FolderSummary[] }) {
  const { progressMapsByFolder } = useFolderProgress();
  return useMemo(
    () =>
      folderSummaries.reduce<YearStats>((acc, folderSummary) => {
        const progressMap = progressMapsByFolder[folderSummary.folder] ?? getDefaultProgressMap();
        const bytes = Object.values(progressMap).reduce((acc, progress) => acc + progress.progressEvent.bytes, 0);
        const total = Object.values(progressMap).reduce(
          (acc, progress) => acc + (progress.progressEvent.total ?? 0),
          0
        );

        acc.mediaItemsCount += folderSummary.mediaItemsCount;
        acc.indexedCount += folderSummary.indexedCount;
        acc.downloadedCount += folderSummary.downloadedCount;
        acc.bytes += bytes;
        acc.total += total;

        return acc;
      }, yearStatsSchema.parse(undefined)),
    [folderSummaries, progressMapsByFolder]
  );
}

function FolderSummaryRow({ folderSummary }: { folderSummary: FolderSummary }) {
  return (
    <FolderDrawer folder={folderSummary.folder} key={folderSummary.folder}>
      <Box
        sx={{
          cursor: 'pointer',
          userSelect: 'none',
          '&:hover > div:first-of-type': {
            color: 'var(--color-jade-green)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'grid',

            gridTemplateColumns: '3.5rem 1fr 230px',
            alignItems: 'center',
            paddingTop: '5px',
          }}
        >
          <Typography
            sx={{ lineHeight: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            title={folderSummary.folder}
            variant='body2'
          >
            {folderSummary.folder}
          </Typography>

          <Box sx={{}}>
            <LinearProgress
              color='primary'
              value={(folderSummary.downloadedCount / folderSummary.mediaItemsCount) * 100}
              variant='determinate'
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              gridTemplateColumns: '1fr 1fr 1fr',
              paddingRight: 1,
              p: {
                textAlign: 'right',
              },
            }}
          >
            <Typography variant='body2'>{folderSummary.mediaItemsCount}</Typography>
            <Typography variant='body2'>{folderSummary.indexedCount}</Typography>
            <Typography variant='body2'>{folderSummary.downloadedCount}</Typography>
          </Box>
        </Box>

        <Box sx={{ gridColumn: '1/-1' }}>
          <FolderProgress folder={folderSummary.folder} />
        </Box>
      </Box>
    </FolderDrawer>
  );
}

function FolderProgress({ folder }: { folder: string }) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { progressMapsByFolder } = useFolderProgress();
  const progressMap = progressMapsByFolder[folder];
  const progressMapFlat = progressMap ? Object.values(progressMap).filter((p) => p.progressEvent.progress !== 1) : [];
  const hasProgress = !!progressMapFlat.length;

  useScrollToBottom(scrollableRef, [progressMapFlat]);

  return progressMapFlat.length ? (
    <Box sx={{ position: 'relative', height: 197, marginY: 2 }}>
      <HiddenScroll
        ref={scrollableRef}
        sx={{
          position: 'absolute',
          inset: 0,
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
