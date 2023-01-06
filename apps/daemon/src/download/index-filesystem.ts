import { MessageType, SendMessage, downloadDataSchema, exifDateToDate, getStateFlags, updateFolder } from 'data/daemon';
import { createGettersAndSetters, getFileTree, getFolderFromDate, moveToDateFolder } from '../utils';
import { getExif, getMd5 } from '../exif';

import { FilesystemDatabase } from '../db';
import fsPromises from 'fs/promises';
import path from 'path';

export async function indexFilesystem(
  { db, sendMessage }: { db: FilesystemDatabase; sendMessage: SendMessage },
  incomingPath = ''
) {
  const { getDirectory, getFileIndex, getFileIndexByFilepath, getDownloadState, setFileIndex, setDownloadState } =
    createGettersAndSetters(db);
  const directory = getDirectory();
  const directoryPath = incomingPath || directory.path;
  function onProgress(folder: string, filesystemProgress: number) {
    const downloadState = getDownloadState();
    const updatedDownloadState = updateFolder({ folder, downloadState }, (folder) => {
      folder.indexedCount++;

      return folder;
    });

    updatedDownloadState.filesystemProgress = filesystemProgress;

    setDownloadState(updatedDownloadState);

    sendMessage({
      type: MessageType.download,
      payload: {
        data: downloadDataSchema.parse({ libraryId: db.libraryId, state: updatedDownloadState }),
        text: `Filesystem index progress: ${filesystemProgress}`,
      },
    });
  }
  const filepaths = await getFileTree(directoryPath);

  if (!directory) {
    throw new Error('Directory not set');
  }

  sendMessage({
    type: MessageType.download,
    payload: {
      data: downloadDataSchema.parse({ libraryId: db.libraryId, state: getDownloadState() }),
      text: `Found ${filepaths.length} files in filesystem. Indexing...`,
    },
  });

  return new Promise<boolean>(async (resolve, reject) => {
    try {
      let i = filepaths.length;
      let progress = 0;

      while (i--) {
        const initialFilepath = filepaths[i];
        const relativePath = path.relative(directoryPath, initialFilepath);
        const exif = await getExif(initialFilepath);
        const {
          isMoved,
          filename,
          folder,
          updated: updatedFilepath,
        } = await moveToDateFolder({
          date: exifDateToDate(exif.DateTimeOriginal),
          directoryPath,
          filepath: initialFilepath,
        });
        const existingFileIndex = getFileIndexByFilepath(folder, updatedFilepath);
        const downloadState = getDownloadState();

        if (downloadState.isPaused) {
          sendMessage({
            type: MessageType.download,
            payload: {
              data: downloadDataSchema.parse({ libraryId: db.libraryId, state: downloadState }),
              text: 'Indexing paused.',
            },
          });

          return resolve(false);
        }

        if (isMoved) {
          sendMessage({
            type: MessageType.download,
            payload: {
              data: downloadDataSchema.parse({ libraryId: db.libraryId, state: downloadState }),
              text: `Moved file: ${filename} -> ${updatedFilepath}`,
            },
          });
        } else if (existingFileIndex) {
          updateProgress({ filepaths, folder, i, onProgress, progress });

          continue;
        }

        const { hash, filepath, isRepaired } = await getMd5(updatedFilepath);
        const fileIndex = getFileIndex(folder, hash);

        if (isRepaired) {
          sendMessage({
            type: MessageType.download,
            payload: {
              data: downloadDataSchema.parse({ libraryId: db.libraryId, state: downloadState }),
              text: `Repaired file: ${filepath}`,
            },
          });
        }

        fileIndex.relativePaths.push(relativePath);

        setFileIndex(folder, fileIndex);

        updateProgress({ filepaths, folder, i, onProgress, progress });
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

function updateProgress({
  filepaths,
  folder,
  progress,
  onProgress,
  i,
}: {
  filepaths: string[];
  folder: string;
  progress: number;
  onProgress: (folder: string, filesystemProgress: number) => void;
  i: number;
}) {
  const updatedProgress = Math.round((100 * (filepaths.length - i)) / filepaths.length) / 100;

  if (updatedProgress - progress > 0.01) {
    onProgress(folder, updatedProgress);
    progress = updatedProgress;
  }
}
