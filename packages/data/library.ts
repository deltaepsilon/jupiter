import { animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

import { firestoreDate } from './firestore';
import { mediaItemSchema } from './media-items';
import { z } from 'zod';

export const librarySchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  name: z.preprocess(
    (name) => (name ? name : uniqueNamesGenerator({ dictionaries: [colors, animals], length: 2 }).replace('_', ' ')),
    z.string()
  ),
  mediaItems: z.array(mediaItemSchema).optional(),
  imported: firestoreDate.optional(),
  created: firestoreDate.default(() => new Date()),
  updated: firestoreDate.default(() => new Date()),
});

export type Library = z.infer<typeof librarySchema>;
export type Libraries = [string, Library][];
