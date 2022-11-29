import { Box, Button, Typography } from '@mui/material';
import { LibrariesProvider, useLibraries } from 'web/contexts/libraries-context';

import { Container } from 'ui/components';

export function LibraryDetail() {
  const { libraries } = useLibraries();
  const [, library] = libraries[0];

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      {!library.imported && (
        <Box>
          <Typography sx={{ span: { color: 'var(--color-lava-orange)' } }} variant='h4'>
            Time to <span>organize</span>. <br />
            Stop staring. Click the button.
          </Typography>
          <Box sx={{ textAlign: 'right', paddingTop: 2 }}>
            <Button variant='contained'>Import me</Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
