import { ServiceWorkerMessage, parseClientMessage } from 'data/service-worker';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

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
      registration?.active?.postMessage(message);
    },
    [registration]
  );

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
      navigator.serviceWorker.ready.then((registration) => setRegistration(registration));

      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

      return () => {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      };
    }
  }, []);

  return (
    <ServiceWorkerContext.Provider value={{ isLoading: !registration, sendMessage, registration }}>
      {children}
    </ServiceWorkerContext.Provider>
  );
}

function handleServiceWorkerMessage(event: MessageEvent) {
  const message = parseClientMessage(event.data.type, event.data);

  console.log({ message });
}
