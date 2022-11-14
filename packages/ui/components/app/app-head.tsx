import Head from 'next/head';
import { useEffect } from 'react';

export function AppHead() {
  return (
    <Head>
      <title>Google Photos Tools</title>
      <link href='https://use.typekit.net/axl0ilp.css' rel='stylesheet' />
      <link href='/manifest.json' rel='manifest'></link>
    </Head>
  );
}
