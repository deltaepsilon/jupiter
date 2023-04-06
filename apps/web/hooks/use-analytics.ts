import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export function useAnalytics() {
  useEffect(() => {
    const existingGtmScript = document.getElementById('gtag');

    if (!existingGtmScript) {
      const firstScript = document.getElementsByTagName('script')[0];
      const gtmScript: HTMLScriptElement = document.createElement('script');

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

      gtmScript.id = 'gtag';
      gtmScript.async = true;
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KPH74RS';

      firstScript.parentNode?.insertBefore(gtmScript, firstScript);
    }
  }, []);
}
