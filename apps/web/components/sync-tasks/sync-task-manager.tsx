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
import { MessageAction } from 'data/service-worker';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useMemo } from 'react';
import { useSyncTasks } from 'web/contexts/sync-tasks-context';

interface Props {
  taskId: string;
}

export function SyncTaskManager({ taskId }: Props) {
  const { isActive, manageSyncTask, removeSyncTask, syncTaskRecords } = useSyncTasks();
  const taskRecord = useMemo(() => syncTaskRecords?.[taskId], [syncTaskRecords, taskId]);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gridGap: 8, padding: 2 }}>
        
      </Box>
    </Box>
  );
}

function SyncTaskOptionsMenu({ taskId }: { taskId: string }) {
  const { removeSyncTask, syncTaskRecords } = useSyncTasks();

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
          <MenuItem onClick={() => removeSyncTask(taskId)}>
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
