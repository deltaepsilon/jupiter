import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { ServiceWorkerMessage } from 'data/service-worker';

interface ServiceWorkerValue {
  isLoading: boolean;
  registration?: ServiceWorkerRegistration;
  sendMessage: (message: ServiceWorkerMessage) => void;
}

const ServiceWorkerContext = createContext<ServiceWorkerValue>({ isLoading: true, sendMessage: () => {} });

export function useServiceWorker() {
  return useContext(ServiceWorkerContext);
}

interface Props {
  children: React.ReactNode;
}

export function ServiceWorkerProvider({ children }: Props) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const sendMessage = useCallback(
    (message: ServiceWorkerMessage) => {
      console.log({ message });
      registration?.active?.postMessage(message);
    },
    [registration]
  );

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');

      navigator.serviceWorker.ready.then((registration) => {
        setRegistration(registration);
      });
    }
  }, []);

  return (
    <ServiceWorkerContext.Provider value={{ isLoading: !registration, sendMessage, registration }}>
      {children}
    </ServiceWorkerContext.Provider>
  );
}
