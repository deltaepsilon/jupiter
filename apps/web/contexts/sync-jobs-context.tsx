import { createContext, useContext, useEffect, useState } from 'react';

import { SyncJobs } from 'data/sync';
import { WEB } from 'data/web';
import { useRtdb } from 'ui/hooks';

interface SyncJobsValue {
  syncJobs: SyncJobs;
  isLoading: boolean;
}

const SyncJobsContext = createContext<SyncJobsValue>({ isLoading: true, syncJobs: [] as SyncJobs });

export function useSyncJobs() {
  return useContext(SyncJobsContext);
}

interface Props {
  children: React.ReactNode;
  userId: string;
}

export function SyncJobsProvider({ children, userId }: Props) {
  const { listen } = useRtdb();
  const [isLoading, setIsLoading] = useState<SyncJobsValue['isLoading']>(true);
  const [syncJobs, setSyncJobs] = useState<SyncJobsValue['syncJobs']>([]);

  console.log({ userId });

  useEffect(() => {
    const unsubscribe = listen(WEB.DATABASE.PATHS.SYNC_JOBS(userId), (snapshot) => {
      const key = snapshot.key;
      const value = snapshot.val();

      console.log({ id: key, value });

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [listen, userId]);

  return <SyncJobsContext.Provider value={{ isLoading, syncJobs }}>{children}</SyncJobsContext.Provider>;
}
