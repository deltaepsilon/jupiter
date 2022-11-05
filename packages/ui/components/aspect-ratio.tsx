import { Box, BoxProps } from '@mui/material';

export interface AspectRatioProps extends BoxProps {
  ratio?: number;
}

export function AspectRatio({ ratio = 1, sx = {}, ...rest }: AspectRatioProps) {
  const percentageHeight = 100 / ratio;

  return (
    <Box data-aspect-ratio={ratio} sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'relative',
          '&:after': {
            content: '""',
            display: 'block',
            paddingBottom: `${percentageHeight}%`,
          },
        }}
      />
      <Box sx={{ position: 'absolute', inset: 0, ...sx }} {...rest} />
    </Box>
  );
}
