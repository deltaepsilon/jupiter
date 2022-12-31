import { MessageType, SendMessage, downloadDataSchema } from 'data/daemon';
import { createGettersAndSetters, getFileTree } from '../utils';

import { FilesystemDatabase } from '../db';
import { getMd5 } from '../exif';

export async function indexFilesystem(
  { db, sendMessage }: { db: FilesystemDatabase; sendMessage: SendMessage },
  incomingPath = ''
) {
  const { getDirectory, getFileIndex, getFileIndexByFilepath, getState, setFileIndex, setState } =
    createGettersAndSetters(db);
  const directory = getDirectory();
  const directoryPath = incomingPath || directory.path;
  function onProgress(filesystemProgress: number) {
    const state = getState();

    state.filesystemProgress = filesystemProgress;

    setState(state);

    sendMessage({
      type: MessageType.download,
      payload: {
        data: downloadDataSchema.parse({ libraryId: db.libraryId, state }),
        text: `Filesystem index progress: ${filesystemProgress}`,
      },
    });
  }

  if (!directory) {
    throw new Error('Directory not set');
  }

  const filepaths = await getFileTree(directoryPath);

  sendMessage({
    type: MessageType.download,
    payload: {
      data: downloadDataSchema.parse({ libraryId: db.libraryId, state: getState() }),
      text: `Found ${filepaths.length} files in filesystem. Indexing...`,
    },
  });

  return new Promise<boolean>(async (resolve, reject) => {
    try {
      let i = filepaths.length;
      let progress = 0;

      while (i--) {
        const relativePath = filepaths[i].replace(directoryPath, '.').replace(/\./g, '|');
        const existingFileIndex = getFileIndexByFilepath(relativePath);

        if (existingFileIndex) continue;

        const { hash, filepath, isRepaired } = await getMd5(filepaths[i]);
        const fileIndex = getFileIndex(hash);
        const updatedProgress = Math.round((100 * (filepaths.length - i)) / filepaths.length) / 100;
        const state = getState();

        if (isRepaired) {
          sendMessage({
            type: MessageType.download,
            payload: {
              data: downloadDataSchema.parse({ libraryId: db.libraryId, state }),
              text: `Repaired file: ${filepath}`,
            },
          });
        }

        if (!state.isRunning) {
          sendMessage({
            type: MessageType.download,
            payload: {
              data: downloadDataSchema.parse({ libraryId: db.libraryId, state }),
              text: 'Indexing paused.',
            },
          });

          return resolve(false);
        }

        fileIndex.relativePaths.push(relativePath);

        setFileIndex(fileIndex);

        if (updatedProgress - progress > 0.01) {
          onProgress(updatedProgress);
          progress = updatedProgress;
        }
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
