import { DocumentData, DocumentSnapshot } from 'firebase/firestore/lite';
import { MediaItem, MediaItemTuple, extractTuplesFromQueueTasks } from 'data/media-items';

import { DatabaseReference } from 'firebase/database';
import { Library } from 'data/library';
import { QueueTasks } from '@quiver/firebase-queue';
import { WEB } from 'data/web';
import { addParams } from 'ui/utils';
import md5 from 'md5';
import { refreshMediaItems } from '../utils/refresh-media-items';

export function getHandleLibraryDownloadTask({
  directoryHandle,
  library,
  librarySnapshot,
  mediaItemsRef,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  library: Library;
  librarySnapshot: DocumentSnapshot<DocumentData>;
  mediaItemsRef: DatabaseReference;
}) {
  return async function handleLibraryDownloadTask(tasks: QueueTasks) {
    console.log('tasks', tasks);
    try {
      const mediaItemTuples = extractTuplesFromQueueTasks(tasks);
      const mediaItems = await refreshMediaItems({ library, librarySnapshot, mediaItemsRef, mediaItemTuples });

      console.log('mediaItems', mediaItems);

      await Promise.all(mediaItems.map((mediaItemTuple) => processMediaItem({ directoryHandle, mediaItemTuple })));

      return { success: true, message: 'processed' };
    } catch (error) {
      let message = 'handleLibraryDownloadTask error';

      if (error instanceof Error) {
        message = error.message;
      }

      console.error(error);

      return { success: false, message };
    }
  };
}

async function processMediaItem({
  directoryHandle,
  mediaItemTuple,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  mediaItemTuple: MediaItemTuple;
}) {
  const [, mediaItem] = mediaItemTuple;
  const { baseUrl, filename, mediaMetadata } = mediaItem;
  const { creationTime } = mediaMetadata;
  const creationDate = new Date(creationTime);
  const month = creationDate.getMonth().toString();
  const year = creationDate.getFullYear().toString();
  const fileHandle = await getFileHandleByPath({ directoryHandle, path: [year, month, filename] });

  const response = await fetch(addParams(`${location.origin}${WEB.API.MEDIA_ITEMS_PROXY_URL}`, { url: baseUrl }));

  if (!response.body) {
    throw new Error(`No response body: ${baseUrl}`);
  }

  // https://web.dev/streams/
  const reader = response.body.getReader();
  const writeable = await fileHandle.createWritable();

  while (true) {
    const { done, value } = await reader.read();

    console.log({ done, value });

    if (done) {
      writeable.close();
      break;
    }

    if (value) {
      await writeable.write(value);
    }
  }

  /**
   * TODO
   * - Repair the write to disk.
   * - Debug the throwing batch read
   * - Calculate the md5 hash of the file
   * - Update file metadata
   * - Metadata should include googlePhotosId and libraryItemKey
   * - Update the media item in the database
   * - Write file to disk
   */

  if (!response.ok) {
    console.log('success!');
  }
}

async function getFileHandleByPath({
  directoryHandle,
  path,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  path: string[];
}) {
  const parts = [...path];
  let handle = directoryHandle;

  while (parts.length > 1) {
    const name = parts.shift() as string;

    handle = await handle.getDirectoryHandle(name, { create: true });
  }

  return handle.getFileHandle(parts.shift() as string, { create: true });
}
