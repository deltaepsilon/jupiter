import { createTheme, responsiveFontSizes } from '@mui/material';

const FONT_BOLD = {
  fontFamily: 'oskar, sans-serif', // TODO: remove filicudi-solid
  fontWeight: 600,
};

export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            fontWeight: 600,
            textTransform: 'inherit',
          },
        },
      },
    },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#09203f',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#cbe800',
      },
    },
    typography: {
      fontFamily: 'rival-sans, serif',
      h1: FONT_BOLD,
      h2: FONT_BOLD,
      h3: FONT_BOLD,
      h4: FONT_BOLD,
      h5: FONT_BOLD,
      h6: FONT_BOLD,
    },
  })
);
