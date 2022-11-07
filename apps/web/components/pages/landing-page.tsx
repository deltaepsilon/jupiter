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
          minHeight: 'calc(100vh - 20rem)',
        }}
      >
        <Typography
          sx={{ textAlign: 'center', background: 'var(--color-gentian-blue-metallic)', color: 'white' }}
          variant='h2'
        >
          master your photos
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gridGap: 8, padding: 1 }}>
          <Typography variant='caption'>Works with Google Photos</Typography>
          <Image alt='google photos icon' height={30} src='/icons/google-photos-icon.png' width={30} />
        </Box>

        <Typography sx={{ textAlign: 'center', padding: [1, 4] }} variant='h4'>
          $12 / year
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr', '300px 200px 600px'],
            alignItems: 'center',
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
    </Box>
  );
}
