import { Box, Typography } from '@mui/material';
import { Image, PhoneBorder } from 'ui/components';

import PhotoIcon from '@mui/icons-material/Photo';


export function LandingPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gridGap: 32,

        paddingTop: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 4,
        }}
      >
        <Typography
          sx={{ textAlign: 'center', background: 'var(--color-gentian-blue-metallic)', color: 'white' }}
          variant='h2'
        >
          Master Your Photos
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gridGap: 8, padding: 1 }}>
          <Typography variant='caption'>Works with Google Photos</Typography>
          <Image alt='google photos icon' height={30} src='/icons/google-photos-icon.png' width={30} />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr', '300px 200px 600px'],
            alignItems: 'center',
            overflow: 'hidden',
            maxWidth: 'calc(100vw - 2rem)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: '50vw' }}>
              <PhoneBorder>
                <Image
                  alt='transfer google photos'
                  ratio={419 / 698}
                  src='/images/google-photos-gallery.png'
                  sx={{ img: { borderRadius: 1 } }}
                />
              </PhoneBorder>
            </Box>
          </Box>

          <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', 'row'],
                alignItems: 'center',
                justifyContent: 'space-between',
                gridGap: 8,
                maxHeight: 100,

                animation: ['scroll-down 5s linear infinite', 'scroll-right 5s linear infinite'],
                '@keyframes scroll-right': {
                  '0%': {
                    transform: 'translateX(-150%)',
                  },
                  '100%': {
                    transform: 'translateX(105%)',
                  },
                },
                '@keyframes scroll-down': {
                  '0%': {
                    transform: 'translateY(-150%)',
                  },
                  '100%': {
                    transform: 'translateY(105%)',
                  },
                },
              }}
            >
              <PhotoIcon fontSize='large' sx={{ color: 'var(--color-acid-green)' }} />
              <PhotoIcon fontSize='large' sx={{ color: 'var(--color-acid-lava-orange)' }} />
              <PhotoIcon fontSize='large' sx={{ color: 'var(--color-miami-blue)' }} />
              <PhotoIcon fontSize='large' sx={{ color: 'var(--color-rubystone-red)' }} />
              <PhotoIcon fontSize='large' sx={{ color: 'var(--color-acid-green)' }} />
              <PhotoIcon fontSize='large' sx={{ color: 'var(--color-acid-lava-orange)' }} />
              <PhotoIcon fontSize='large' sx={{ color: 'var(--color-miami-blue)' }} />
              <PhotoIcon fontSize='large' sx={{ color: 'var(--color-rubystone-red)' }} />
            </Box>
          </Box>

          <Image alt='windows explorer' ratio={835 / 559} src='/images/windows-explorer.png' />
        </Box>
      </Box>

      <Typography variant='h4'>Preserve Metadata</Typography>

      <Typography variant='body1'>Google Takeout mangles metadata</Typography>
      <Typography variant='body1'>-- Insert a video of me talking about my Google Photos travails --</Typography>
      <Typography variant='body1'>
        Own your media Google Photos is not archival If you don&apos;t store the bits yourself, you don&apos;t truly own
        them
        <br />
        Keep using Google Photos, but archive to your hard disc
        <br />
        You searched &quot;how to download Google Photos&quot;, &quot;Why is my Google Photos metadata garbage&quot;, or
        something like &quot;how to export all Google Photos&quot;
        <br />
        Surprise! Google has provided a lousy process via Google Takeout, but it wrecks image metadata and messes up all
        of your dates, leading to a scrambled feed of images with untold duplicates.
      </Typography>
    </Box>
  );
}
