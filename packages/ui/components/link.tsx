import { AnchorHTMLAttributes, ReactElement, Ref, forwardRef } from 'react';
import { Box, LinkProps as MuiLinkProps, SxProps } from '@mui/material';

import NextLink from 'next/link';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  button?: boolean;
  blank?: boolean;
  disabled?: Boolean;
  sx?: MuiLinkProps['sx'];
}

const BLANK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

export const Link = forwardRef(
  (
    { blank = false, button, children, disabled = false, href = '', sx, ...rest }: LinkProps,
    ref: Ref<HTMLAnchorElement>
  ) => {
    const props = { ...rest, ...(blank ? BLANK_PROPS : {}) };

    return (
      <Box
        component='span'
        data-link
        sx={{ display: 'inline', a: { textDecoration: button ? 'none' : undefined }, ...sx }}
      >
        <NextLink href={href} passHref ref={ref} {...props}>
          {children}
        </NextLink>
      </Box>
    );
  }
);

Link.displayName = 'Link';
