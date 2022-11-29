import { Box, Button, Typography } from '@mui/material';
import { Container, Link } from 'ui/components';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { WEB } from 'data/web';

export function LibraryMissing() {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box>
        <Typography sx={{ marginTop: 4, marginLeft: 1 }} variant='h4'>
          Sorry Charlie. <br />
          Your library is missing.
        </Typography>
        <Link href={WEB.ROUTES.PHOTOS} sx={{ textAlign: 'right' }}>
          <Button startIcon={<ArrowBackIcon />} sx={{ textDecoration: 'underline' }}>
            Head on back
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
