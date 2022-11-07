import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export function CreateSyncJobButton() {
  return (
    <Button startIcon={<CloudDownloadIcon />} variant='contained'>
      Create Sync Job
    </Button>
  );
}
