import { MessageType, SendMessage, downloadMessageDataSchema, exifDateToDate, updateFolder } from 'data/daemon';
import { createGettersAndSetters, getFileTree, moveToDateFolder, removeIrrelevantFilepaths } from '../utils';
import { getExif, getMd5 } from '../exif';

import { LevelDatabase } from '../level';
import { multiplex } from 'ui/utils';
import path from 'path';

const MULTIPLEX_THREADS = 20;

interface OnProgressArgs {
  folder: string;
  filesystemProgress: number;
  isDownloaded: boolean;
}

export async function indexFilesystem(
  { db, sendMessage, subFolder = '' }: { db: LevelDatabase; sendMessage: SendMessage; subFolder?: string },
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
  const directory = await getDirectory();
  const directoryPath = path.join(incomingPath || directory.path, subFolder);
  async function onProgress({ folder, filesystemProgress, isDownloaded }: OnProgressArgs) {
    const downloadState = await getDownloadState();
    const updatedDownloadState = await updateFolder({ folder, downloadState }, async (folderSummary) => {
      folderSummary.state = 'indexing';
      folderSummary.downloadedCount = (await getDownloadedIds(folderSummary.folder)).size;
      folderSummary.indexedCount = (await getRelativeFilePaths(folderSummary.folder)).size;

      return folderSummary;
    });

    updatedDownloadState.filesystemProgress = filesystemProgress;

    await setDownloadState(updatedDownloadState);

    sendMessage({
      type: MessageType.download,
      payload: {
        data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state: updatedDownloadState }),
        // text: `Filesystem index progress: ${filesystemProgress}`,
      },
    });
  }
  const allFilepaths = await getFileTree(directoryPath);
  const filepaths = removeIrrelevantFilepaths(allFilepaths);

  if (!directory) {
    throw new Error('Directory not set');
  }

  sendMessage({
    type: MessageType.download,
    payload: {
      data: downloadMessageDataSchema.parse({ libraryId: db.libraryId, state: await getDownloadState() }),
      text: `Found ${filepaths.length} files in filesystem. Indexing...`,
    },
  });

  return new Promise<boolean>(async (resolve, reject) => {
    const multiplexer = multiplex(MULTIPLEX_THREADS);

    try {
      let i = filepaths.length;
      let hasMessagedPause = false;

      console.info(`Indexing ${i} files`);

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
          const existingFileIndex = await getFileIndexByFilepath(folder, updatedFilepath);
          const downloadState = await getDownloadState();
          const googleMediaItemId = exif.GoogleMediaItemId;
          const isDownloaded = !!googleMediaItemId;

          if (googleMediaItemId) {
            await updateDownloadedIds(folder, (downloadIds) => downloadIds.add(googleMediaItemId));
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
            await updateProgress({
              filepaths,
              folder,
              isDownloaded,
              onProgress,
              relativeFilePathsSize: (await getAllRelativeFilePaths()).size,
            });

            return;
          }

          const { hash, filepath, isRepaired } = await getMd5(updatedFilepath, exif);
          const fileIndex = await getFileIndex(folder, hash);

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

          await setFileIndex(folder, fileIndex);

          await updateProgress({
            filepaths,
            folder,
            isDownloaded,
            onProgress,
            relativeFilePathsSize: (await getAllRelativeFilePaths()).size,
          });
        });
      }

      console.info(`Index complete`);

      await multiplexer.getPromise();

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

async function updateProgress({
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

  await onProgress({ folder, filesystemProgress, isDownloaded });

  return filesystemProgress;
}
