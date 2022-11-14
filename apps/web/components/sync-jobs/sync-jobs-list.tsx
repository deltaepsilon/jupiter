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
import { Stage, SyncJobRecord, SyncJobRecords } from 'data/sync';

import { CreateSyncJobButton } from 'web/components/sync-jobs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { MenuTrigger } from 'ui/components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSyncJobs } from 'web/contexts/sync-jobs-context';

export function SyncJobsList({ syncJobRecords }: { syncJobRecords: SyncJobRecords }) {
  return (
    <Paper elevation={0} sx={{ display: 'flex', flexDirection: 'column', gridGap: 1, width: 400 }}>
      <List sx={{ flex: 1 }}>
        {Object.entries(syncJobRecords).map(([jobId, syncJobRecord]) => {
          return (
            <>
              <Box sx={{ display: 'flex', alignItmes: 'center', gridGap: 8, padding: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant='subtitle1'>{syncJobRecord.directoryName}</Typography>
                  <Typography variant='body2'>Processing: </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SyncJobAction jobId={jobId} syncJobRecord={syncJobRecord} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SyncJobOptionsMenu jobId={jobId} />
                </Box>
              </Box>
              <Divider />
            </>
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
    case Stage.ready:
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
