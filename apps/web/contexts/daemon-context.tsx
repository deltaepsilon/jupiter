import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface DaemonValue {
  isConnected: boolean;
}

const DaemonContext = createContext<DaemonValue>({ isConnected: false });

export function useDaemon() {
  return useContext(DaemonContext);
}

interface Props {
  children: React.ReactNode;
}

export function DaemonProvider({ children }: Props) {
  const value = { isConnected: false };

  return <DaemonContext.Provider value={value}>{children}</DaemonContext.Provider>;
}
