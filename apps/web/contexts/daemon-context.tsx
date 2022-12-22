import {
  DaemonMessage,
  DaemonMessages,
  GetMessageArgs,
  PORT,
  daemonMessage,
  decodeMessage,
  encodeMessage,
} from 'data/daemon';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { localforage } from 'ui/utils';

export interface DaemonValue {
  connect: () => void;
  emptyMessages: () => Promise<void>;
  isConnected: boolean;
  messages: DaemonMessages;
  send: (message: GetMessageArgs) => Promise<DaemonMessage>;
}

type ResolversMap = Map<
  string,
  { resolve: (message: DaemonMessage) => void; reject: (message: DaemonMessage) => void }
>;

const DaemonContext = createContext<DaemonValue>({
  connect: () => {},
  emptyMessages: async () => {},
  isConnected: false,
  messages: [],
  send: async () => daemonMessage.parse({ payload: { error: 'not sent' } }),
});

export function useDaemon() {
  return useContext(DaemonContext);
}

interface Props {
  children: React.ReactNode;
}

export function DaemonProvider({ children }: Props) {
  const resolversRef = useRef<ResolversMap>(new Map());
  const [messages, setMessages] = useState<DaemonMessages>([]);
  const onMessage = useCallback(async (message: DaemonMessage) => {
    const messages = await localforage.getDaemonMessages();
    const resolvers = resolversRef.current.get(message.uuid);
    const updated = [...messages, message];

    if (resolvers) {
      message.success ? resolvers.resolve(message) : resolvers.reject(message);
    }

    await localforage.setDaemonMessages(updated);
    setMessages(updated);
  }, []);
  const emptyMessages = useCallback(async () => {
    await localforage.setDaemonMessages([]);
    setMessages([]);
  }, []);
  const { connect, isConnected, ws } = useWebsocket(onMessage);
  const send = useCallback(
    async (message: GetMessageArgs) =>
      new Promise<DaemonMessage>(async (resolve, reject) => {
        if (ws) {
          const { message: encoded, stringified } = encodeMessage(message);

          resolversRef.current.set(encoded.uuid, { resolve, reject });

          await onMessage(encoded);

          ws.send(stringified);
        } else {
          reject('not connected');
        }
      }),
    [onMessage, ws]
  );
  const value = { connect, emptyMessages, isConnected, messages, send };

  useEffect(() => {
    localforage.getDaemonMessages().then((messages) => {
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  return <DaemonContext.Provider value={value}>{children}</DaemonContext.Provider>;
}

function useWebsocket(onMessageHandler: (message: DaemonMessage) => void) {
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const connect = useCallback(() => {
    const ws = new WebSocket(`ws://localhost:${PORT}`);

    setWs(ws);
  }, []);

  useEffect(() => {
    if (ws) {
      function onOpen() {
        setIsConnected(true);
      }

      function onMessage(messageEvent: MessageEvent) {
        if (typeof messageEvent.data === 'string') {
          const parsed = daemonMessage.safeParse(JSON.parse(messageEvent.data));

          parsed.success && onMessageHandler(parsed.data);
        }
      }

      function onClose() {
        setIsConnected(false);
      }

      ws.addEventListener('open', onOpen);
      ws.addEventListener('message', onMessage);
      ws.addEventListener('close', onClose);

      return () => {
        ws.removeEventListener('open', onOpen);
        ws.removeEventListener('message', onMessage);
        ws.removeEventListener('close', onClose);
      };
    }
  }, [onMessageHandler, ws]);

  return { connect, isConnected, ws };
}
