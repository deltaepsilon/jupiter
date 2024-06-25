import { Box, Button, Typography } from '@mui/material';
import { Link } from '../link';
import { useEffect, useMemo, useState } from 'react';
import { getV2AlertFlag, setV2AlertFlag } from '../../utils/localforage';
import { ModalDrawer, ModalDrawerFooter } from '../modal-drawer';

export function V2Alert() {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useMemo(() => () => setIsOpen(false), []);

  useEffect(() => {
    getV2AlertFlag().then((flag) => {
      if (!flag) {
        setIsOpen(true);
        setV2AlertFlag(true);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: ['column', 'column', 'row'],
          alignItems: 'center',
          gap: 4,
          background: 'var(--color-gentian-blue-metallic)',
          color: 'var(--color-desert)',
          padding: [1, 2],
        }}
      >
        <Typography variant='h4'>Heads up!</Typography>
        <Typography sx={{ flex: 1, marginTop: '1px' }} variant='body1'>
          Check out{' '}
          <Link
            href='https://www.quiverphotos.com'
            sx={{
              '& a': {
                color: 'var(--color-desert)',
                '&:visited': {
                  color: 'var(--color-desert)',
                },
              },
            }}
          >
            QuiverPhotos.com
          </Link>{' '}
          for a fresh, new version of this application!
        </Typography>
        <Link href='https://www.quiverphotos.com'>
          <Button color='secondary' variant='contained'>
            Visit QuiverPhotos.com
          </Button>
        </Link>
        <Button color='secondary' onClick={() => setIsOpen(true)} variant='outlined'>
          Learn More
        </Button>
      </Box>
      <ModalDrawer
        aria-describedby='QuiverPhotos.com announcement'
        aria-labelledby='QuiverPhotos.com announcement'
        isOpen={isOpen}
        onClose={onClose}
        title='QuiverPhotos.com announcement'
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 4 }}>
          <Typography variant='h6'>Greetings!</Typography>
          <Typography variant='body1'>
            My name is Chris. I built this application, and I am pleased to announce{' '}
            <Link href='https://www.quiverphotos.com'>an entirely new version</Link> (&quot;v2&quot;) of Quiver Photos!
          </Typography>

          <Box>
            <Typography variant='h6'>Improvements include:</Typography>
            <ul>
              <li>
                <Typography variant='body1'>A private desktop application for MacOS, Windows, and Linux</Typography>
              </li>
              <li>
                <Typography variant='body1'>Album-based downloads</Typography>
              </li>
              <li>
                <Typography variant='body1'>Geo location EXIF data recovery</Typography>
              </li>
              <li>
                <Typography variant='body1'>Apple Live Photo recovery (both JPEG and MOV files)</Typography>
              </li>
              <li>
                <Typography variant='body1'>
                  File system &quot;created at&quot; timestamps match the media&apos;s &quot;creation&quot; date.
                </Typography>
              </li>
            </ul>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant='h6'>URL:</Typography>
              <Link href='https://www.quiverphotos.com'>QuiverPhotos.com</Link>
            </Box>
          </Box>

          <Typography variant='body1'>
            This website (v1) is no longer supported as of June 25th, 2024. The v1 application will still be available,
            and should continue work; however, Google has been throttling our API access, leading to ongoing complaints
            of failed imports. Once traffic to v1 drops off, we expect it to function better. But v2 is the future!
          </Typography>

          <Box>
            <Typography variant='h6'>Existing Subscribers</Typography>
            <Typography variant='body1'>
              If you&apos;ve already subscribed to Quiver Photos v1, you will receive a 100% discount code to purchase a
              license to v2. That should land in your email inbox shortly. If not, email me at chris@quiverphotos.com
            </Typography>
          </Box>

          <Box>
            <Typography variant='h6'>Thank you!</Typography>
            <Typography variant='body1'>
              Thank you so much for your support over the last year of development. I always knew that 100% data
              recovery would require a dedicated desktop application, and the continued interest in Quiver Photos has
              made that possible.
              <br />
              <br />
              Chris Esplin
            </Typography>
          </Box>
        </Box>

        <ModalDrawerFooter>
          <Link href='https://www.quiverphotos.com'>
            <Button color='primary' variant='contained'>
              Visit QuiverPhotos.com
            </Button>
          </Link>

          <Button onClick={onClose} variant='text'>
            Close
          </Button>
        </ModalDrawerFooter>
      </ModalDrawer>
    </>
  );
}
