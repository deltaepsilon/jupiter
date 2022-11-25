import { Box, Button, ButtonProps, SxProps } from '@mui/material';
import { FormEventHandler, useCallback, useState } from 'react';
import { ModalDrawer, ModalDrawerFooter, useModalDrawer } from 'ui/components';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { CreateSyncTaskForm } from './create-sync-task-form';
import { SyncTask } from 'data/sync';
import { SyncTaskManager } from './sync-task-manager';
import { stopPropagation } from 'ui/utils';
import { useAuth } from 'ui/contexts';
import { useModalState } from 'ui/hooks';
import { useSyncTasks } from 'web/contexts/sync-tasks-context';

interface Props {
  taskId: string;
  variant: ButtonProps['variant'];
}

export function ManageSyncTasksButton({ taskId, variant = 'outlined' }: Props) {
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: `manage-task-${taskId}` });

  return (
    <>
      <ModalDrawer
        aria-describedby='manage sync task'
        aria-labelledby='manage sync task'
        isOpen={isOpen}
        onClose={onClose}
        title='Manage Sync Task'
      >
        <Box onClick={stopPropagation} sx={{ padding: [1, 2] }}>
          <SyncTaskManager taskId={taskId} />
          <ModalDrawerFooter>
            <Button onClick={onClose} variant='outlined'>
              Done
            </Button>
          </ModalDrawerFooter>
        </Box>
      </ModalDrawer>

      <Button onClick={onOpen} variant={variant}>
        Manage
      </Button>
    </>
  );
}
