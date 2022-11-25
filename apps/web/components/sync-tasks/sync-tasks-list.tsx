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
import { SyncStage, SyncTaskRecord, SyncTaskRecords } from 'data/sync';

import { CreateSyncTaskButton } from 'web/components/sync-tasks';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FolderIcon from '@mui/icons-material/Folder';
import { ManageSyncTasksButton } from './manage-sync-task-button';
import { MenuTrigger } from 'ui/components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useSyncTasks } from 'web/contexts/sync-tasks-context';

const SYNC_STAGE_DETAILS: Record<SyncStage, { color: string; icon: React.ReactNode }> = {
  [SyncStage.ready]: { color: 'var(--color-pastel-blue)', icon: <PlayCircleOutlineIcon /> },
  [SyncStage.downloading]: { color: 'var(--color-miami-blue)', icon: <PlayCircleOutlineIcon /> },
};

export function SyncTasksList({ syncTaskRecords }: { syncTaskRecords: SyncTaskRecords }) {
  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', gridGap: 1, width: 400 }}>
      <List sx={{ flex: 1 }}>
        {Object.entries(syncTaskRecords).map(([taskId, syncTaskRecord], i, records) => {
          const isLast = i === records.length - 1;
          const { color, icon } = SYNC_STAGE_DETAILS[syncTaskRecord.stage];

          return (
            <Box key={taskId}>
              <Box sx={{ display: 'flex', alignItems: 'center', gridGap: 8, padding: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant='subtitle1'>{syncTaskRecord.taskName}</Typography>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gridGap: 8 }} variant='subtitle2'>
                    <FolderIcon /> {syncTaskRecord.directoryName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 1, color }}>{icon}</Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SyncTaskAction syncTaskRecord={syncTaskRecord} taskId={taskId} />
                </Box>
              </Box>
              {!isLast && <Divider />}
            </Box>
          );
        })}
      </List>
      <CreateSyncTaskButton />
    </Paper>
  );
}

function SyncTaskAction({ taskId, syncTaskRecord }: { taskId: string; syncTaskRecord: SyncTaskRecord }) {
  const isReady = syncTaskRecord.stage === SyncStage.ready;

  return <ManageSyncTasksButton taskId={taskId} variant={isReady ? 'contained' : 'outlined'} />;
}
