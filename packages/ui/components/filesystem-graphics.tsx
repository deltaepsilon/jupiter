import { Box, SxProps } from '@mui/material';

interface Props {
  sx?: SxProps;
}

export function LastChildGraphic({ sx = {} }: Props) {
  return (
    <ChildGraphic
      sx={{
        '[data-child-graphic-vertical]': { height: '50%' },
        '[data-child-graphic-horizontal]': { height: '100%' },
        ...sx,
      }}
    />
  );
}

export function ChildGraphic({ sx = {} }: Props) {
  return (
    <Box data-child-graphic sx={{ paddingLeft: '2px', height: '32px', ...sx }}>
      <Box data-child-graphic-vertical sx={{ borderLeft: '1px solid black', width: '19px', height: '100%' }}>
        <Box
          data-child-graphic-horizontal
          sx={{ position: 'relative', left: '-1px', borderBottom: '1px solid black', width: '100%', height: '50%' }}
        />
      </Box>
    </Box>
  );
}
