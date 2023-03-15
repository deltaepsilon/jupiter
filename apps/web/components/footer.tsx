import { Box, Button, Typography } from '@mui/material';
import { Image, Link } from 'ui/components';

import { AppFooter } from 'ui/components/app';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import { WEB } from 'data/web';
import WebAssetIcon from '@mui/icons-material/WebAsset';

export function Footer() {
  return (
    <AppFooter
      sx={{
        position: 'relative',
        // padding: 1,
        backgroundColor: 'var(--color-gentian-blue-metallic)',
        color: 'var(--color-white)',
      }}
    >
      <Box sx={{ display: 'grid', gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'], paddingBottom: [2, 0] }}>
        <List>
          <ListItem
            blank
            href={'https://github.com/deltaepsilon/jupiter'}
            startIcon={<GitHubIcon />}
            text='deltaepsilon/jupiter'
          />

          <ListItem blank href={'https://twitter.com/chrisesplin'} startIcon={<TwitterIcon />} text='@ChrisEsplin' />

          <ListItem blank href={'https://www.chrisesplin.com'} startIcon={<WebAssetIcon />} text='ChrisEsplin.com' />

          <ListItem
            blank
            href={`mailto:${WEB.EMAIL}?subject=Quiver%20Photos&body=Chris!%0D%0A%0D%0AI%20have%20questions%20%3A)`}
            startIcon={<EmailIcon />}
            text={WEB.EMAIL}
          />
        </List>
        <List>
          <ListItem href='/content/google-takeout' text='Google Takeout Guide' />
        </List>
        <List>
          <ListItem href='/content/policies' text='Policies' />
        </List>
      </Box>
      <WorksWithGooglePhotos />
    </AppFooter>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component='ul'
      sx={{
        listStyleType: 'none',
        '&> *': {
          display: 'block',
        },
        button: { color: 'var(--color-white)' },
        a: { color: 'var(--color-white)', textDecoration: 'none' },
        'a:visited': {
          color: 'var(--color-white)',
        },
      }}
    >
      {children}
    </Box>
  );
}

function ListItem({
  blank = false,
  href,
  startIcon = null,
  text,
}: {
  blank?: boolean;
  href: string;
  startIcon?: React.ReactNode;
  text: string;
}) {
  return (
    <Typography component='li' variant='body2'>
      <Link blank={blank} href={href}>
        <Button startIcon={startIcon}>{text}</Button>
      </Link>
    </Typography>
  );
}

function WorksWithGooglePhotos() {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 0,
        bottom: 0,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gridGap: 8,
        paddingX: 2,

        color: 'var(--color-white)',
      }}
    >
      <Typography variant='caption'>Works with Google Photos</Typography>
      <Image
        alt='google photos icon'
        height={24}
        src='/icons/google-photos-icon.png'
        sx={{ position: 'relative', top: 2 }}
        width={24}
      />
    </Box>
  );
}
