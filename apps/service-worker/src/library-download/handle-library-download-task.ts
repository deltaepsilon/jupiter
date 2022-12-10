import { DatabaseReference, update } from 'firebase/database';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore/lite';
import { MediaItemTuple, extractTuplesFromQueueTasks, fileSystemSchema } from 'data/media-items';

import { Library } from 'data/library';
import { QueueTasks } from '@jupiter/firebase-queue';
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
    try {
      const mediaItemTuples = extractTuplesFromQueueTasks(tasks);
      const mediaItems = await refreshMediaItems({ library, librarySnapshot, mediaItemsRef, mediaItemTuples });

      await Promise.all(
        mediaItems.map((mediaItemTuple) => processMediaItem({ directoryHandle, mediaItemTuple, mediaItemsRef }))
      );

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
  mediaItemsRef,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  mediaItemTuple: MediaItemTuple;
  mediaItemsRef: DatabaseReference;
}) {
  const [, mediaItem] = mediaItemTuple;
  const { filename } = mediaItem;

  console.log('fetching', filename);

  const fileHandle = await getFileHandle({ directoryHandle, mediaItemTuple });

  const fileExists = await updateMetadata({ fileHandle, mediaItemTuple });

  /**
   * TODO
   * x Repair the write to disk.
   * x Debug the throwing batch read
   * - Calculate the md5 hash of the file
   * - Update file metadata
   * - Metadata should include googlePhotosId and libraryItemKey
   * - Update the media item in the database
   * - Write file to disk
   */

  if (fileExists) {
    console.log('file exists', filename);
  } else {
    console.log('file does not exist', filename);
    await downloadFile({ directoryHandle, mediaItemTuple });
  }
}

function getFileHandle({
  directoryHandle,
  mediaItemTuple,
}: {
  directoryHandle: FileSystemDirectoryHandle;
  mediaItemTuple: MediaItemTuple;
}) {
  const [, mediaItem] = mediaItemTuple;
  const { filename, mediaMetadata } = mediaItem;
  const { creationTime } = mediaMetadata;
  const creationDate = new Date(creationTime);
  const month = creationDate.getMonth().toString();
  const year = creationDate.getFullYear().toString();

  return getFileHandleByPath({ directoryHandle, path: [year, month, filename] });
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

async function updateMetadata({
  fileHandle,
  mediaItemTuple,
}: {
  fileHandle: FileSystemFileHandle;
  mediaItemTuple: MediaItemTuple;
}) {
  // https://code.flickr.net/2012/06/01/parsing-exif-client-side-using-javascript-2/
  const [, mediaItem] = mediaItemTuple;
  const { mediaMetadata } = mediaItem;
  const file = await fileHandle.getFile();
  const filePart = await file.slice(0, 1024 * 64); // 1024 bytes / kibibyte
  const buffer = await filePart.arrayBuffer();
  const size = file.size;

  console.log('size, mediaMetadata', size, mediaMetadata);

  /**
   * TODO
   * - Make sure that metadata is returning correctly.
   * - Write 'Create Date' and 'Modify Date'
   * - Consider https://www.npmjs.com/package/streat
   */

  if (buffer.byteLength) {
    const exifResponse = await fetch(WEB.API.MEDIA_ITEMS_EXIF, { body: buffer, method: 'POST' });
    const exif = await exifResponse.json();

    console.log('exif', exif);

    // await update(mediaItemsRef, { [`${key}/fileSystem`]: fileSystemSchema.parse({ ...file }) });

    console.log('file', file);
    return true;
  } else {
    return false;
  }
}

async function downloadFile({
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

  const response = await fetch(
    addParams(`${location.origin}${WEB.API.MEDIA_ITEMS_PROXY_URL}`, {
      payload: btoa(JSON.stringify({ mediaItem })),
    })
  );
  let length = 0;

  if (!response.body) {
    throw new Error(`No response body: ${baseUrl}`);
  }

  // https://web.dev/streams/
  const reader = response.body.getReader();
  const writeable = await fileHandle.createWritable();

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        writeable.close();
        break;
      }

      if (value) {
        length += value.length;

        console.log(filename, length);

        await writeable.write(value);
      }
    }
  } catch (error) {
    console.info('aborted', filename);
    console.error(error);

    await writeable.abort();
  }
}
