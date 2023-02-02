import Box, { BoxProps } from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import { forwardRef, useEffect } from 'react';

export const hiddenScrollSx: BoxProps['sx'] = {
  overflow: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

export const HiddenScroll = forwardRef(({ children, sx = {}, ...props }: BoxProps, ref) => {
  return (
    <Box
      ref={ref}
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
});

HiddenScroll.displayName = 'HiddenScroll';

export function useScrollToBottom(scrollableRef: React.RefObject<HTMLElement>, memoArray: any[] = []) {
  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, memoArray);
}
