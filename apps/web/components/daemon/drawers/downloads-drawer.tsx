import { Box, Button, IconButton, SxProps, Typography } from '@mui/material';

import { Link, ModalDrawer, ModalDrawerFooter } from 'ui/components';
import { WEB } from 'data/web';
import NextImage from 'next/image';

import { useModalState } from 'ui/hooks';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  sx?: SxProps;
}

export function DesktopAppDownloadsDrawer({ children, disabled = false, sx = {} }: Props) {
  const { isOpen, onOpen, onClose } = useModalState({ autoOpenHash: 'desktop-app-downloads' });

  return (
    <>
      <ModalDrawer
        aria-describedby='desktop app downloads'
        aria-labelledby='desktop app downloads'
        isOpen={isOpen}
        onClose={onClose}
        title='Desktop app downloads'
      >
        <Box
          sx={{
            display: 'grid',
            gridGap: 16,
            padding: 4,
            maxWidth: 500,
            a: { textDecoration: 'underline' },
            h6: { marginTop: 2 },
          }}
        >
          <Typography variant='h6'>Downloads</Typography>

          {WEB.ZIP_DOWNLOADS.map(({ filename, icon, platform }) => (
            <Link href={`/daemon/${filename}`} key={filename} rel='noopener noreferrer' target='__blank'>
              <Box sx={{ display: 'flex', gridGap: 16, a: { color: 'var(--color-miami-blue)' } }}>
                <Box
                  sx={{ position: 'relative', top: 1, width: '24px', height: '24px', img: { objectFit: 'contain' } }}
                >
                  <NextImage alt={platform} fill src={icon} />
                </Box>
                <Typography variant='body1'>{filename}</Typography>
              </Box>
            </Link>
          ))}

          <Typography variant='h6'>Why do we need a desktop app?</Typography>

          <Box component='ul' sx={{ marginY: 0 }}>
            <Typography component='li' variant='body1'>
              Web apps can&apos;t write EXIF data... but desktop apps can!
            </Typography>

            <Typography component='li' variant='body1'>
              The Web App controls the Desktop App
            </Typography>

            <Typography component='li' variant='body1'>
              The desktop app runs in the background.
            </Typography>
          </Box>

          <Typography variant='h6'>Which version do I need?</Typography>
          <Typography variant='body1'>
            <Link href='https://en.wikipedia.org/wiki/X86' rel='noopener noreferrer' target='__blank'>
              x86
            </Link>{' '}
            works for most computers. Choose the ARM build if you KNOW you&apos;re running an ARM chip.
          </Typography>

          <Typography variant='h6'>Why should I trust you?</Typography>
          <Typography variant='body1'>
            You can see source code on{' '}
            <Link href={WEB.URLS.GITHUB} rel='noopener noreferrer' target='__blank'>
              GitHub
            </Link>
            . You can also build it yourself.
          </Typography>
          <Typography variant='body1'>
            In addition, I have a public profile that you can check out on <Link href={WEB.URLS.TWITTER}>Twitter</Link>,{' '}
            <Link href={WEB.URLS.REDDIT} rel='noopener noreferrer' target='__blank'>
              Reddit
            </Link>
            , and{' '}
            <Link href={WEB.URLS.PORTFOLIO} rel='noopener noreferrer' target='__blank'>
              chrisesplin.com
            </Link>
            . DMs are welcome.
          </Typography>
          <Typography variant='body1'>
            Email me anytime at{' '}
            <Link
              href={`mailto:${WEB.EMAIL}?subject=Quiver%20Photos&body=Chris!%0D%0A%0D%0AI%20have%20questions%20%3A)`}
            >
              {WEB.EMAIL}
            </Link>
            . I&apos;m always eager to chat.
          </Typography>
        </Box>

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
