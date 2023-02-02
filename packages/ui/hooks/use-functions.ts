import {
  BatchGetMediaItemsParams,
  RefreshMediaItemStatsParams,
  batchGetMediaItemsParamsSchema,
  refreshMediaItemStatsParamsSchema,
} from 'data/functions';
import { BatchGetMediaItemsResponse, batchGetMediaItemsResponseSchema } from 'data/media-items';
import { GetAuthUrlRequest, GetAuthUrlResponse, getAuthUrlRequest, getAuthUrlResponse } from 'data/auth';
import {
  LibraryTaskStatusRequest,
  LibraryTaskStatusResponse,
  libraryTaskStatusRequest,
  libraryTaskStatusResponse,
} from 'data/library';
import { ListMediaItemsRequest, ListMediaItemsResponse, listMediaItemsResponse } from 'api';

import { httpsCallable } from 'firebase/functions';
import { useCallback } from 'react';
import { useFirebase } from 'ui/contexts';

enum FunctionName {
  batchGetMediaItems = 'batchGetMediaItems',
  getAuthUrl = 'getAuthUrl',
  listMediaItems = 'listMediaItems',
  refreshMediaItemStats = 'refreshMediaItemStats',
  setLibraryImportStatus = 'setLibraryImportStatus',
}

export type UseFunctionsResult = ReturnType<typeof useFunctions>;

export function useFunctions() {
  const { functions } = useFirebase();

  const batchGetMediaItems = useCallback(
    async (params: BatchGetMediaItemsParams) => {
      if (!functions) throw new Error('Functions not initialized');

      const func = httpsCallable<BatchGetMediaItemsParams, BatchGetMediaItemsResponse>(
        functions,
        FunctionName.batchGetMediaItems
      );
      const response = await func(batchGetMediaItemsParamsSchema.parse(params));

      return batchGetMediaItemsResponseSchema.parse(response.data);
    },
    [functions]
  );
  const getAuthUrl = useCallback(
    async (params: GetAuthUrlRequest) => {
      if (!functions) throw new Error('Functions not initialized');

      const func = httpsCallable<GetAuthUrlRequest, GetAuthUrlResponse>(functions, FunctionName.getAuthUrl);
      const response = await func(getAuthUrlRequest.parse(params));

      return getAuthUrlResponse.parse(response.data);
    },
    [functions]
  );
  const listMediaItems = useCallback(
    async (params: ListMediaItemsRequest) => {
      if (!functions) throw new Error('Functions not initialized');

      const func = httpsCallable<ListMediaItemsRequest, ListMediaItemsResponse>(functions, FunctionName.listMediaItems);
      const response = await func(params);
      const parsed = listMediaItemsResponse.parse(response.data);

      if ('httpErrorCode' in parsed) {
        return { error: parsed };
      } else {
        return { data: parsed };
      }
    },
    [functions]
  );

  const refreshMediaItemStats = useCallback(
    async (params: RefreshMediaItemStatsParams) => {
      if (!functions) throw new Error('Functions not initialized');

      const func = httpsCallable<RefreshMediaItemStatsParams, void>(functions, FunctionName.refreshMediaItemStats);
      const response = await func(refreshMediaItemStatsParamsSchema.parse(params));

      return response.data;
    },
    [functions]
  );
  const setLibraryImportStatus = useCallback(
    async (params: LibraryTaskStatusRequest) => {
      if (!functions) throw new Error('Functions not initialized');

      const func = httpsCallable<LibraryTaskStatusRequest, LibraryTaskStatusResponse>(
        functions,
        FunctionName.setLibraryImportStatus
      );
      const response = await func(libraryTaskStatusRequest.parse(params));

      console.log(response.data);

      return libraryTaskStatusResponse.parse(response.data);
    },
    [functions]
  );

  return { batchGetMediaItems, getAuthUrl, listMediaItems, refreshMediaItemStats, setLibraryImportStatus };
}
