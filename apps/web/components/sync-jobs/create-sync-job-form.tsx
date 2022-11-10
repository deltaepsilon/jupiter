import { Box, Button, TextField, Typography } from '@mui/material';
import { MediaItems, mediaItemsResponseSchema } from 'data/media-items';
import { SyncJob, syncJobSchema } from 'data/sync';
import nookies, { parseCookies } from 'nookies';
import { useCallback, useEffect, useState } from 'react';

import { Cookie } from 'data/sync';
import FolderIcon from '@mui/icons-material/Folder';
import { Image } from 'ui/components';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { WEB } from 'data/web';
import { addParams } from 'ui/utils';
import { useAuth } from 'ui/contexts';
import { useLocalFilesystem } from 'ui/hooks';
import { useRouter } from 'next/router';

interface Props {
  onSyncJobChange: (syncJob?: SyncJob) => void;
}

export function CreateSyncJobForm({ onSyncJobChange }: Props) {
  const { firstPage, onLibraryChangeClick, onLibraryPickerClick } = useGooglePhotos();
  const { directoryHandle, getDirectoryHandle } = useLocalFilesystem();

  useEffect(() => {
    if (directoryHandle) {
      const { accessToken, refreshToken } = parseCookies();

      const parsed = syncJobSchema.safeParse({
        accessToken,
        refreshToken,
        directoryHandle,
        created: new Date(),
      });

      if (parsed.success) {
        onSyncJobChange(parsed.data);
      } else {
        console.info(parsed.error);
        onSyncJobChange();
      }
    }
  }, [directoryHandle, firstPage, onSyncJobChange]);

  return (
    <>
      <Typography sx={{ paddingBottom: 4 }} variant='h6'>
        Steps
      </Typography>
      <Box sx={{ display: 'grid', gridGap: 16, gridTemplateColumns: ['1fr', '1fr 1fr'] }}>
        <Typography variant='subtitle2'>1. Authorize Google Account</Typography>

        {firstPage ? (
          <Button
            onClick={onLibraryChangeClick}
            startIcon={<Image alt='google photos icon' height={12} src='/icons/google-photos-icon.png' width={12} />}
            variant='outlined'
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

        {firstPage && (
          <ImageList cols={3} rowHeight={164} sx={{ width: '100%', height: 350, gridColumn: '1/-1' }}>
            {firstPage.map((mediaItem) => (
              <ImageListItem key={mediaItem.baseUrl}>
                <Image
                  alt={mediaItem.description ?? 'preview image'}
                  fill
                  src={mediaItem.baseUrl}
                  sx={{ objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}

        <Typography variant='subtitle2'>2. Pick a sync destination</Typography>

        <Button onClick={getDirectoryHandle} startIcon={<FolderIcon />} sx={{ height: 45 }} variant='outlined'>
          Pick a destination
        </Button>
      </Box>
    </>
  );
}

function useGooglePhotos() {
  const [firstPage, setFirstPage] = useState<MediaItems>();
  const router = useRouter();
  const onLibraryPickerClick = useCallback(async () => {
    const response = await fetch(WEB.API.MEDIA_ITEMS);

    if (response.status === 401) {
      const response = await fetch(
        addParams(`${location.origin}${WEB.API.OAUTH2}`, { redirect: window.location.href })
      );
      const { authUrl } = await response.json();

      router.replace(authUrl);
    } else {
      const data = await response.json();
      const { mediaItems } = mediaItemsResponseSchema.parse(data);

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
