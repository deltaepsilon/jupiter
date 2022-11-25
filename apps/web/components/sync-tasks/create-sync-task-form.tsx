import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { MediaItems, mediaItemsResponseSchema } from 'data/media-items';
import { SyncTask, getDefaultSyncTask, syncTaskSchema } from 'data/sync';
import nookies, { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';

import { Cookie } from 'data/sync';
import FolderIcon from '@mui/icons-material/Folder';
import { Image } from 'ui/components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { WEB } from 'data/web';
import { addParams } from 'ui/utils';
import { useLocalFilesystem } from 'ui/hooks';
import { useRouter } from 'next/router';

interface Props {
  onSyncTaskChange: (syncTask?: SyncTask) => void;
}

export function CreateSyncTaskForm({ onSyncTaskChange }: Props) {
  const [taskName, setTaskName] = useState<string>(getDefaultSyncTask().taskName);
  const { firstPage, onLibraryChangeClick, onLibraryPickerClick } = useGooglePhotos();
  const { directoryHandle, getDirectoryHandle } = useLocalFilesystem();

  useEffect(() => {
    if (directoryHandle) {
      const { accessToken, refreshToken } = parseCookies();
      const payload = {
        ...getDefaultSyncTask(),
        taskName,
        accessToken,
        refreshToken,
        directoryHandle,
        created: new Date(),
      };

      const parsed = syncTaskSchema.safeParse(payload);

      if (parsed.success) {
        onSyncTaskChange(parsed.data);
      } else {
        console.info(payload, parsed.error);
        onSyncTaskChange();
      }
    }
  }, [directoryHandle, firstPage, taskName, onSyncTaskChange]);

  return (
    <>
      <Box sx={{ display: 'grid', gridGap: 16, gridTemplateColumns: ['1fr', '1fr 1fr'] }}>
        <TextField
          autoFocus
          label='Task name'
          onChange={(e) => setTaskName(e.target.value)}
          placeholder='Download main account'
          sx={{ gridColumn: '1/-1' }}
          value={taskName}
        />

        {firstPage ? (
          <Button
            onClick={onLibraryChangeClick}
            startIcon={<Image alt='google photos icon' height={12} src='/icons/google-photos-icon.png' width={12} />}
            variant={firstPage.length ? 'outlined' : 'contained'}
          >
            Change library
          </Button>
        ) : (
          <Button
            disabled={!!firstPage}
            onClick={onLibraryPickerClick}
            startIcon={<Image alt='google photos icon' height={12} src='/icons/google-photos-icon.png' width={12} />}
            variant='outlined'
          >
            Authorize
          </Button>
        )}

        <Button
          onClick={getDirectoryHandle}
          startIcon={<FolderIcon />}
          sx={{ height: 45 }}
          variant={directoryHandle ? 'outlined' : 'contained'}
        >
          {directoryHandle ? 'Change destination' : 'Pick a destination'}
        </Button>

        {directoryHandle && (
          <Box sx={{ gridColumn: '1/-1', paddingTop: 2 }}>
            <Typography variant='h6'>Selected destination</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gridGap: 16 }}>
              <FolderIcon />
              <Typography>{directoryHandle.name}</Typography>
            </Box>
          </Box>
        )}

        {firstPage && (
          <Box sx={{ gridColumn: '1/-1', paddingTop: 2 }}>
            <Typography variant='h6'>Selected library sample</Typography>
            <ImageList cols={3} rowHeight={164} sx={{ width: '100%', height: 500 }}>
              {firstPage.map((mediaItem) => (
                <ImageListItem key={mediaItem.baseUrl} sx={{ position: 'relative' }}>
                  <Image
                    alt={mediaItem.description ?? 'preview image'}
                    fill
                    sizes='230px'
                    src={mediaItem.baseUrl}
                    sx={{ objectFit: 'cover' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </Box>
    </>
  );
}

function useGooglePhotos() {
  const [firstPage, setFirstPage] = useState<MediaItems>();
  const router = useRouter();
  const onLibraryPickerClick = useCallback(async () => {
    const { accessToken, refreshToken } = parseCookies();
    const response = await fetch(
      addParams(`${location.origin}${WEB.API.MEDIA_ITEMS}`, { accessToken, refreshToken, pageSize: 9 })
    );

    if (response.status === 401) {
      const response = await fetch(
        addParams(`${location.origin}${WEB.API.OAUTH2}`, { redirect: window.location.href })
      );
      const { authUrl } = await response.json();

      router.replace(authUrl);
    } else {
      const data = await response.json();
      const { accessToken, refreshToken, mediaItems } = mediaItemsResponseSchema.parse(data);

      nookies.set(null, Cookie.accessToken, accessToken, { path: '/' });
      nookies.set(null, Cookie.refreshToken, refreshToken, { path: '/' });

      setFirstPage(mediaItems);
    }
  }, [router]);
  const onLibraryChangeClick = useCallback(async () => {
    nookies.set(null, Cookie.accessToken, '', { path: '/' });
    nookies.set(null, Cookie.refreshToken, '', { path: '/' });

    setFirstPage(undefined);
  }, []);

  useEffect(() => {
    onLibraryPickerClick();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { firstPage, onLibraryChangeClick, onLibraryPickerClick };
}
