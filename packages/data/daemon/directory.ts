import { z } from 'zod';

export enum DirectoryAction {
  set = 'set',
  request = 'request',
  list = 'list',
}

export const listDirectoriesData = z.object({
  currentDirectory: z.string().default(''),
  navigate: z.string().default(''),
  childDirectories: z.array(z.object({ name: z.string(), isDirectory: z.boolean() })).default([]),
});
export type ListDirectoriesData = z.infer<typeof listDirectoriesData>;

export const setDirectoryData = z.object({
  directory: z.string(),
  libraryId: z.string(),
});
export type SetDirectoryData = z.infer<typeof setDirectoryData>;

export const directorySchema = z.object({ path: z.string(), name: z.string() });
export type Directory = z.infer<typeof directorySchema>;
