import Head from 'next/head';
import { useEffect } from 'react';

export function AppHead() {
  return (
    <Head>
      <title>Google Photos Tools</title>
      <link href='/manifest.json' rel='manifest'></link>
    </Head>
  );
}
