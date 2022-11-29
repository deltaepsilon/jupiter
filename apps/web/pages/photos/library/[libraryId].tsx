import { Box, Button, Typography } from '@mui/material';
import { Container, Link } from 'ui/components';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LibraryMissing } from 'web/components/libraries';
import { LibraryPage } from 'web/components/pages/library-page';
import { WEB } from 'data/web';
import { useRouter } from 'next/router';

export default function LibraryId() {
  const router = useRouter();
  const { libraryId } = router.query;

  return libraryId ? <LibraryPage libraryId={libraryId as string} /> : <LibraryMissing />;
}
