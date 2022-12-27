import { DownloadDbKeys, SendMessage } from 'data/daemon';

import { FilesystemDatabase } from '../db';
import { MediaItem } from 'data/media-items';

export function startDownload({
  db,
  mediaItem,
  sendMessage,
}: {
  db: FilesystemDatabase;
  mediaItem: MediaQueryListEventMap;
  sendMessage: SendMessage;
}) {}
