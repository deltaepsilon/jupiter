import { Box, Button, IconButton, SxProps, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FolderDataProvider, FolderDataValue, useFolderData } from 'web/contexts';
import { ModalDrawer, ModalDrawerFooter } from 'ui/components';

import { useMemo } from 'react';
import { useModalState } from 'ui/hooks';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  folder: string;
  sx?: SxProps;
}

export function FolderDrawer({ children, disabled = false, folder, sx = {} }: Props) {
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: `folder-${folder}` });

  return (
    <>
      <ModalDrawer
        aria-describedby='folder details'
        aria-labelledby='folder details'
        isOpen={isOpen}
        onClose={onClose}
        title={`Folder details: ${folder}`}
      >
        <FolderDataProvider folder={folder}>
          <FolderDrawerContents />
        </FolderDataProvider>

        <ModalDrawerFooter>
          <Button onClick={onClose} variant='text'>
            Close
          </Button>
        </ModalDrawerFooter>
      </ModalDrawer>
      <Box onClick={onOpen} sx={{ ...sx, opacity: disabled ? 0.5 : 1, userSelect: disabled ? 'none' : 'all' }}>
        {children}
      </Box>
    </>
  );
}

function FolderDrawerContents() {
  const folderDataValue = useFolderData();
  const rows = useMemo(() => {
    const mediaItemRows = Object.values(folderDataValue.folderData.mediaItems);
    const fileRows = Object.values(folderDataValue.folderData.files)
      .filter((f) => !f.mediaItemId)
      .map((f) => ({ id: f.md5, filename: f.relativePaths[0].split('/').pop(), isFile: true }));

    return [...mediaItemRows];
  }, [folderDataValue]);
  const columns = useMemo(() => getDataGridColumns(folderDataValue), [folderDataValue]);

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          paddingY: 2,
          h6: { display: 'flex', gridGap: 4, fontSize: 16, minWidth: '10rem' },
        }}
      >
        <Typography variant='h6'>
          <span>Total:</span> <span>{rows.length}</span>
        </Typography>
        <Typography variant='h6'>
          <span>Downloaded:</span> <span>{folderDataValue.folderData.downloadedIds.size}</span>
        </Typography>
        <Typography variant='h6'>
          <span>Media:</span> <span>{folderDataValue.folderData.ingestedIds.size}</span>
        </Typography>
        <Typography variant='h6'>
          <span>File Paths:</span> <span>{folderDataValue.folderData.relativeFilePaths.size}</span>
        </Typography>
      </Box>
      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid columns={columns} rows={rows} />
      </Box>
    </Box>
  );
}

function getDataGridColumns({ folderData, getFileFromMediaItemId }: FolderDataValue) {
  const columns: GridColDef[] = [
    { field: 'filename', headerName: 'Filename', width: 300, valueGetter: (params) => params.row.filename },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      valueGetter: (params) => {
        const isUnidentifiedFile = !!params.row.isFile;
        const isDownloaded = folderData.downloadedIds.has(params.row.id);
        const isIngested = folderData.ingestedIds.has(params.row.id);
        const isFilesystem = !!getFileFromMediaItemId(params.row.id);

        switch (true) {
          case isUnidentifiedFile:
            return 'Unidentified file';

          case isDownloaded && isIngested && isFilesystem:
            return '✓';

          case isDownloaded && !isIngested:
            return 'Downloaded only';

          case isIngested && !isDownloaded && !isFilesystem:
            return 'Awaiting download';

          default:
            return '';
        }
      },
    },
  ];

  return columns;
}
