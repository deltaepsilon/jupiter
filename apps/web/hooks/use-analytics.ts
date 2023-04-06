import { useCallback, useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export enum CustomEvent {
  login = 'login',
}

export function useAnalytics() {
  useEffect(() => {
    const existingGtmScript = document.getElementById('google-tag-manager');

    if (!existingGtmScript) {
      const firstScript = document.getElementsByTagName('script')[0];
      const gtmScript: HTMLScriptElement = document.createElement('script');

      push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

      gtmScript.id = 'google-tag-manager';
      gtmScript.async = true;
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KPH74RS';

      firstScript.parentNode?.insertBefore(gtmScript, firstScript);
    }
  }, []);

  return { push };
}

function push(event: Record<string, string | number>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
