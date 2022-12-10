import { Payload, SendMessageToSwArgs, sendMessageToSw } from '@jupiter/post-message';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type SendMessageArgs = Omit<SendMessageToSwArgs, 'registration'>;

export type SendMessage<T> = (args: SendMessageArgs) => Promise<Payload<T>>;

interface ServiceWorkerValue {
  isLoading: boolean;
  registration?: ServiceWorkerRegistration;
  sendMessage: SendMessage<any>;
}

const ServiceWorkerContext = createContext<ServiceWorkerValue>({
  isLoading: true,
  sendMessage: async (_: SendMessageArgs) => ({ error: 'uninitialized', data: false }),
});

export function useServiceWorker() {
  return useContext(ServiceWorkerContext);
}

interface Props {
  children: React.ReactNode;
}

export function ServiceWorkerProvider({ children }: Props) {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration>();
  const sendMessage = useCallback(
    (args: SendMessageArgs) => {
      if (!registration) {
        throw new Error('Service worker registration not found');
      }

      return sendMessageToSw<any>({ ...args, registration });
    },
    [registration]
  );

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
      navigator.serviceWorker.ready.then((registration) => setRegistration(registration));
    }
  }, []);

  return (
    <ServiceWorkerContext.Provider value={{ isLoading: !registration, sendMessage, registration }}>
      {children}
    </ServiceWorkerContext.Provider>
  );
}
