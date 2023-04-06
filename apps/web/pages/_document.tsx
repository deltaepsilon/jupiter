import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link href='https://use.typekit.net/axl0ilp.css' rel='stylesheet' />
        <link href='/logos/quiver-photos-icon.png' rel='icon' type='image/x-icon'></link>
      </Head>
      <body>
        <noscript>
          <iframe
            height='0'
            src='https://www.googletagmanager.com/ns.html?id=GTM-KPH74RS'
            style={{ display: 'none', visibility: 'hidden' }}
            width='0'
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
