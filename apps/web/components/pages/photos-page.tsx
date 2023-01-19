import { LibrariesProvider, useLibraries } from 'web/contexts/libraries-context';

import { CircularProgress } from '@mui/material';
import { Container } from 'ui/components';
import { LibrariesList } from 'web/components/libraries';
import { useAuth } from 'ui/contexts';

export function PhotosPage() {
  const { userId } = useAuth({ forceRedirect: true });

  return userId ? (
    <LibrariesProvider userId={userId}>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <PhotosPageConnected />
      </Container>
    </LibrariesProvider>
  ) : null;
}

function PhotosPageConnected() {
  const { isLoading } = useLibraries();

  switch (true) {
    case isLoading:
      return <CircularProgress sx={{ alignSelf: 'center' }} />;

    default:
      return <LibrariesList />;
  }
}
