import { AspectRatio } from 'ui/components/aspect-ratio';
import { Box } from '@mui/material';

export function PhoneBorder({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ margin: 1 }}>
      <Box
        sx={{
          borderRadius: 7,
          border: '8px solid black',
          boxShadow: '5px 3px 0px 0px var(--color-jade-green)',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: -14,
            top: '15%',

            backgroundColor: 'silver',
            borderRadius: 2,
            height: '10%',
            width: 3,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            right: -14,
            top: '30%',

            backgroundColor: 'silver',
            borderRadius: 2,
            height: '25%',
            width: 4,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: 6,
            top: 6,
            zIndex: 1,

            backgroundColor: 'black',
            borderRadius: '100%',
            height: 15,
            width: 15,
          }}
        />

        <Box sx={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>{children}</Box>
      </Box>
    </Box>
  );
}
