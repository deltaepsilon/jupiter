import { MessageType, SendMessage, downloadMessageDataSchema, exifDateToDate, updateFolder } from 'data/daemon';
import { SEPARATOR, createGettersAndSetters, getFileTree, moveToDateFolder, removeDaemonFilepaths } from '../utils';
import { getExif, getMd5 } from '../exif';

import { FilesystemDatabase } from '../db';
import { multiplex } from 'ui/utils';
import path from 'path';

const MULTIPLEX_THREADS = 20;

interface OnProgressArgs {
  folder: string;
  filesystemProgress: number;
  isDownloaded: boolean;
}

export async function indexFilesystem(
  { db, sendMessage }: { db: FilesystemDatabase; sendMessage: SendMessage },
  incomingPath = ''
) {
  const {
    getDirectory,
    getFileIndex,
    getFileIndexByFilepath,
    getDownloadState,
    getDownloadedIds,
    getRelativeFilePaths,
    getAllRelativeFilePaths,
    setFileIndex,
    setDownloadState,
    updateDownloadedIds,
  } = createGettersAndSetters(db);
  const directory = getDirectory();
  const directoryPath = incomingPath || directory.path;
  function onProgress({ folder, filesystemProgress, isDownloaded }: OnProgressArgs) {
    const downloadState = getDownloadState();
    const updatedDownloadState = updateFolder({ folder, downloadState }, (folderSummary) => {
      folderSummary.state = 'indexing';
      folderSummary.downloadedCount = getDownloadedIds(folderSummary.folder).size;
      folderSummary.indexedCount = getRelativeFilePaths(folderSummary.folder).size;

      return folderSummary;
    });

    updatedDownloadState.filesystemProgress = filesystemProgress;

    setDownloadState(updatedDownloadState);

    sendMessage({
      type: MessageType.download,
      payload: {
        data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state: updatedDownloadState }),
        // text: `Filesystem index progress: ${filesystemProgress}`,
      },
    });
  }
  const allFilepaths = await getFileTree(directoryPath);
  const filepaths = removeDaemonFilepaths(allFilepaths);

  if (!directory) {
    throw new Error('Directory not set');
  }

  sendMessage({
    type: MessageType.download,
    payload: {
      data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state: getDownloadState() }),
      text: `Found ${filepaths.length} files in filesystem. Indexing...`,
    },
  });

  return new Promise<boolean>(async (resolve, reject) => {
    const multiplexer = multiplex(MULTIPLEX_THREADS);

    try {
      let i = filepaths.length;
      let hasMessagedPause = false;

      while (i--) {
        const initialFilepath = filepaths[i];

        multiplexer.add(async () => {
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
          const googleMediaItemId = exif.GoogleMediaItemId;
          const isDownloaded = !!googleMediaItemId;

          if (googleMediaItemId) {
            updateDownloadedIds(folder, (downloadIds) => downloadIds.add(googleMediaItemId));
          }

          if (downloadState.isPaused) {
            sendMessage({
              type: MessageType.download,
              payload: {
                data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state: downloadState }),
                text: hasMessagedPause ? undefined : 'Indexing paused.',
              },
            });

            hasMessagedPause = true;

            return resolve(false);
          }

          if (isMoved) {
            sendMessage({
              type: MessageType.download,
              payload: {
                data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state: downloadState }),
                text: `Moved file: ${filename} -> ${updatedFilepath}`,
              },
            });
          } else if (existingFileIndex) {
            updateProgress({
              filepaths,
              folder,
              isDownloaded,
              onProgress,
              relativeFilePathsSize: getAllRelativeFilePaths().size,
            });

            return;
          }

          const { hash, filepath, isRepaired } = await getMd5(updatedFilepath, exif);
          const fileIndex = getFileIndex(folder, hash);

          if (isRepaired) {
            sendMessage({
              type: MessageType.download,
              payload: {
                data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state: downloadState }),
                text: `Repaired file: ${filepath}`,
              },
            });
          }

          if (googleMediaItemId) {
            fileIndex.mediaItemId = googleMediaItemId;
          }

          fileIndex.relativePaths.push(relativePath);

          setFileIndex(folder, fileIndex);

          updateProgress({
            filepaths,
            folder,
            isDownloaded,
            onProgress,
            relativeFilePathsSize: getAllRelativeFilePaths().size,
          });
        });
      }

      await multiplexer.getPromise();

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

function updateProgress({
  filepaths,
  folder,
  isDownloaded,
  onProgress,
  relativeFilePathsSize,
}: {
  filepaths: string[];
  folder: string;
  isDownloaded: boolean;
  onProgress: (args: OnProgressArgs) => void;
  relativeFilePathsSize: number;
}) {
  const filesystemProgress = Math.round((100 * relativeFilePathsSize) / filepaths.length) / 100;

  onProgress({ folder, filesystemProgress, isDownloaded });

  return filesystemProgress;
}
