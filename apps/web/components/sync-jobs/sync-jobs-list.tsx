import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from '@mui/material';
import { SyncJobRecord, SyncJobRecords, SyncStage } from 'data/sync';

import { CreateSyncJobButton } from 'web/components/sync-jobs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FolderIcon from '@mui/icons-material/Folder';
import { MenuTrigger } from 'ui/components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useSyncJobs } from 'web/contexts/sync-jobs-context';

const SYNC_STAGE_DETAILS: Record<SyncStage, { color: string; icon: React.ReactNode }> = {
  [SyncStage.ready]: { color: 'var(--color-pastel-blue)', icon: <PlayCircleOutlineIcon /> },
  [SyncStage.processing]: { color: 'var(--color-miami-blue)', icon: <PlayCircleOutlineIcon /> },
  [SyncStage.writing]: { color: 'var(--color-jade-green)', icon: <PlayCircleOutlineIcon /> },
};

export function SyncJobsList({ syncJobRecords }: { syncJobRecords: SyncJobRecords }) {
  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', gridGap: 1, width: 400 }}>
      <List sx={{ flex: 1 }}>
        {Object.entries(syncJobRecords).map(([jobId, syncJobRecord], i, records) => {
          const isLast = i === records.length - 1;
          const { color, icon } = SYNC_STAGE_DETAILS[syncJobRecord.stage];

          return (
            <Box key={jobId}>
              <Box sx={{ display: 'flex', alignItems: 'center', gridGap: 8, padding: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant='subtitle1'>{syncJobRecord.jobName}</Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gridGap: 8 }} variant='subtitle2'>
                    <FolderIcon /> {syncJobRecord.directoryName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 1, color }}>{icon}</Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SyncJobAction jobId={jobId} syncJobRecord={syncJobRecord} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SyncJobOptionsMenu jobId={jobId} />
                </Box>
              </Box>
              {!isLast && <Divider />}
            </Box>
          );
        })}
      </List>
      <CreateSyncJobButton />
    </Paper>
  );
}

function SyncJobAction({ jobId, syncJobRecord }: { jobId: string; syncJobRecord: SyncJobRecord }) {
  const { startSyncJob } = useSyncJobs();

  switch (syncJobRecord.stage) {
    case SyncStage.ready:
      return (
        <Button onClick={() => startSyncJob(jobId)} variant='outlined'>
          Start
        </Button>
      );

    default:
      return <CircularProgress />;
  }
}

function SyncJobOptionsMenu({ jobId }: { jobId: string }) {
  const { removeSyncJob } = useSyncJobs();

  return (
    <Box sx={{ position: 'relative' }}>
      <MenuTrigger
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        trigger={
          <IconButton sx={{ color: 'primary.main' }}>
            <MoreVertIcon />
          </IconButton>
        }
      >
        <MenuList>
          <MenuItem onClick={() => removeSyncJob(jobId)}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </MenuList>
      </MenuTrigger>
    </Box>
  );
}
