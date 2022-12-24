import {
  DaemonMessage,
  DaemonMessages,
  GetMessageArgs,
  MessageType,
  PORT,
  daemonMessage,
  encodeMessage,
} from 'data/daemon';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

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

export type Respond = (message: GetMessageArgs) => void;
type MessageHandler = (message: DaemonMessage, respond: Respond) => void;

export function useDaemon() {
  return useContext(DaemonContext);
}

interface Props {
  children: React.ReactNode;
  handlers: Map<MessageType, MessageHandler>;
}

export function DaemonProvider({ children, handlers }: Props) {
  const resolversRef = useRef<ResolversMap>(new Map());
  const [messages, setMessages] = useState<DaemonMessages>([]);
  const onMessage = useCallback(
    async (message: DaemonMessage, responseWs: WebSocket) => {
      const messages = await localforage.getDaemonMessages();
      const resolvers = resolversRef.current.get(message.uuid);
      const updated = [...messages, message].slice(-100);
      const handler = handlers.get(message.type);

      if (handler) {
        handler(message, function respond(message: GetMessageArgs) {
          if (responseWs) {
            const { stringified } = encodeMessage(message);

            responseWs.send(stringified);
          }
        });
      }

      if (resolvers && !message.isClient) {
        message.success ? resolvers.resolve(message) : resolvers.reject(message);
      }

      await localforage.setDaemonMessages(updated);
      setMessages(updated);
    },
    [handlers]
  );
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

          await onMessage(encoded, ws);

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

type OnMessageHandler = (message: DaemonMessage, ws: WebSocket) => void;

function useWebsocket(onMessageHandler: OnMessageHandler) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { isConnected, setIsConnected } = useOnMessage(ws, onMessageHandler);
  const connect = useCallback(() => {
    const ws = new WebSocket(`ws://localhost:${PORT}`);

    setWs(ws);
  }, []);
  const closeWebsocket = useCallback(() => {
    ws?.close();
    setWs(null);
    setIsConnected(false);
  }, [ws, setIsConnected]);

  usePingPong(ws, closeWebsocket);

  return { connect, isConnected, ws };
}

function useOnMessage(ws: WebSocket | null, onMessageHandler: OnMessageHandler) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (ws) {
      function onOpen() {
        setIsConnected(true);
      }

      function onClose() {
        setIsConnected(false);
      }

      function onMessage(messageEvent: MessageEvent) {
        if (typeof messageEvent.data === 'string') {
          const parsed = daemonMessage.safeParse(JSON.parse(messageEvent.data));

          parsed.success && ws && !parsed.data.isHeartbeat && onMessageHandler(parsed.data, ws);
        }
      }

      ws.addEventListener('open', onOpen);
      ws.addEventListener('close', onClose);
      ws.addEventListener('message', onMessage);

      return () => {
        ws.removeEventListener('open', onOpen);
        ws.removeEventListener('close', onClose);
        ws.removeEventListener('message', onMessage);
      };
    }
  }, [onMessageHandler, ws]);

  return { isConnected, setIsConnected };
}

function usePingPong(ws: WebSocket | null, onClose: () => void) {
  useEffect(() => {
    if (ws) {
      const { stringified: pingMessage } = encodeMessage({
        type: MessageType.ping,
        isHeartbeat: true,
        payload: {},
      });
      let timer: ReturnType<typeof setTimeout>;

      const intervalTimer = setInterval(() => {
        ws.send(pingMessage);

        timer = setTimeout(() => onClose(), 1000);
      }, 2000);

      function onMessage(messageEvent: MessageEvent) {
        if (typeof messageEvent.data === 'string') {
          const parsed = daemonMessage.safeParse(JSON.parse(messageEvent.data));

          if (parsed.success && parsed.data.type === MessageType.ping) {
            clearTimeout(timer);
          }
        }
      }

      ws.addEventListener('message', onMessage);

      return () => {
        clearInterval(intervalTimer);
        ws.removeEventListener('message', onMessage);
      };
    }
  }, [onClose, ws]);
}
