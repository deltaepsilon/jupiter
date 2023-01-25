import { AnchorHTMLAttributes, ReactElement, Ref, forwardRef } from 'react';
import { Box, LinkProps as MuiLinkProps, SxProps } from '@mui/material';

import NextLink from 'next/link';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  button?: boolean;
  disabled?: Boolean;
  sx?: MuiLinkProps['sx'];
}

export const Link = forwardRef(
  ({ button, children, disabled = false, href = '', sx, ...rest }: LinkProps, ref: Ref<HTMLAnchorElement>) => (
    <Box sx={{ textDecoration: button ? 'none' : undefined, ...sx }}>
      <NextLink href={href} passHref ref={ref} {...rest}>
        {children}
      </NextLink>
    </Box>
  )
);

Link.displayName = 'Link';
