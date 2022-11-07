import Box, { BoxProps } from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';

export const hiddenScrollSx: BoxProps['sx'] = {
  overflow: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

export function HiddenScroll({ children, sx = {}, ...props }: BoxProps) {
  return (
    <Box
      sx={
        {
          ...hiddenScrollSx,
          ...sx,
        } as BoxProps['sx']
      }
      {...props}
    >
      {children}
    </Box>
  );
}
