import { GetAuthUrlRequest, GetAuthUrlResponse, getAuthUrlRequest, getAuthUrlResponse } from 'data/auth';
import {
  LibraryTaskStatusRequest,
  LibraryTaskStatusResponse,
  libraryTaskStatusRequest,
  libraryTaskStatusResponse,
} from 'data/library';
import { ListMediaItemsRequest, ListMediaItemsResponse, listMediaItemsResponse } from 'api/photos/list-media-items';

import { httpsCallable } from 'firebase/functions';
import { useCallback } from 'react';
import { useFirebase } from 'ui/contexts';

enum FunctionName {
  listMediaItems = 'listMediaItems',
  batchGetMediaItems = 'batchGetMediaItems',
  getAuthUrl = 'getAuthUrl',
  setLibraryImportStatus = 'setLibraryImportStatus',
}

export function useFunctions() {
  const { functions } = useFirebase();
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
  const getAuthUrl = useCallback(
    async (params: GetAuthUrlRequest) => {
      if (!functions) throw new Error('Functions not initialized');

      const func = httpsCallable<GetAuthUrlRequest, GetAuthUrlResponse>(functions, FunctionName.getAuthUrl);
      const response = await func(getAuthUrlRequest.parse(params));

      return getAuthUrlResponse.parse(response.data);
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

      return libraryTaskStatusResponse.parse(response.data);
    },
    [functions]
  );

  return { getAuthUrl, listMediaItems, setLibraryImportStatus };
}
