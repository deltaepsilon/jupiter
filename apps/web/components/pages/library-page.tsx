import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { LibrariesProvider, useLibraries } from 'web/contexts/libraries-context';
import { LibraryDetail, LibraryMissing } from 'web/components/libraries';

import { Container } from 'ui/components';
import { useAuth } from 'ui/contexts';

interface Props {
  libraryId: string;
}

export function LibraryPage({ libraryId }: Props) {
  const { userId } = useAuth({ forceRedirect: true });

  return userId ? (
    <LibrariesProvider libraryId={libraryId} userId={userId}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <LibraryPageConnected />
      </Container>
    </LibrariesProvider>
  ) : null;
}

function LibraryPageConnected() {
  const { isLoading, libraries } = useLibraries();

  switch (true) {
    case isLoading:
      return <CircularProgress sx={{ alignSelf: 'center' }} />;

    case !libraries.length:
      return <LibraryMissing />;

    default:
      return <LibraryDetail />;
  }
}
