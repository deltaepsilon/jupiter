import { SyncJob, SyncJobs, syncJobSchema } from 'data/sync';
import { enableMapSet, immerable, produce } from 'immer';
import { isClient, isServer } from 'ui/utils';

import localforage from 'localforage';

enableMapSet();

isClient &&
  isClient(() => {
    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE, localforage.WEBSQL],
      name: 'jupiter-storage',
    });
  });

export enum LocalforageDataType {
  SyncJobs = 'sync-jobs',
}

export interface LocalforageDataTypeMapping {
  [LocalforageDataType.SyncJobs]: SyncJobs;
}

// Sync Jobs
export async function getSyncJob(id: string) {
  const syncJobs = await getSyncJobs();

  return syncJobs ? syncJobs[id] : null;
}
export async function addSyncJob(id: string, job: SyncJob) {
  const syncJobs = await getSyncJobs();

  return setSyncJobs({ ...syncJobs, [id]: job });
}
export async function updateSyncJob(id: string, updates: Partial<SyncJob>) {
  const syncJobs = await getSyncJobs();
  const syncJob = syncJobs ? syncJobs[id] : null;
  const updatedSyncJob = syncJobSchema.parse({ ...syncJob, ...updates });

  await setSyncJobs({ ...syncJobs, [id]: updatedSyncJob });

  return updatedSyncJob;
}
export async function removeSyncJob(id: string) {
  const syncJobs = await getSyncJobs();

  if (syncJobs && syncJobs[id]) {
    const { [id]: _, ...newSyncJobs } = syncJobs;

    setSyncJobs(newSyncJobs);

    return true;
  } else {
    console.warn(`Could not find sync job with id ${id}`);

    return false;
  }
}
export async function clearSyncJobs() {
  return localforage.removeItem(LocalforageDataType.SyncJobs);
}
const getSyncJobs = createGetter<SyncJobs | null>(LocalforageDataType.SyncJobs, null);
const setSyncJobs = createSetter<SyncJobs>(LocalforageDataType.SyncJobs);

// Create getters and setters
function createGetter<Type>(key: string, defaultValue: Type): () => Promise<Type> {
  return isServer && isServer()
    ? ((async () => {}) as unknown as () => Promise<Type>)
    : ((async () => {
        const value = await localforage.getItem(key);

        return value === null ? defaultValue : deserialize(value);
      }) as unknown as () => Promise<Type>);
}

function createSetter<Type>(key: string) {
  return isServer && isServer() ? async () => {} : async (value: Type) => localforage.setItem(key, serialize(value));
}

/**
 * Esplin 5/19/21
 *
 * Safari v14 is having trouble saving Sets into localforage.
 */
function serialize<Type>(object: Type): Type {
  const isImmerable = getIsImmerable(object);
  const isArray = Array.isArray(object);
  const cannotSerialize =
    object instanceof FileSystemDirectoryHandle || object instanceof FileSystemFileHandle || object instanceof Date;

  if (cannotSerialize) {
    return object;
  } else if (!isImmerable && isArray) {
    return object.map(serialize) as unknown as Type;
  } else {
    return produce(object, (draft: Type) => {
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const value = object[key];

          if (value instanceof Set) {
            const set = value as unknown as Set<any>;

            draft[key] = { __isSet: true, value: [...set] } as unknown as Type[Extract<keyof Type, string>];
          } else if (typeof value === 'object') {
            draft[key] = serialize(value);
          } else if (typeof value === 'function') {
            delete draft[key];
          }
        }
      }
    });
  }
}

function deserialize<Type>(object: Type): Type {
  const isImmerable = getIsImmerable(object);

  return !isImmerable
    ? object
    : produce(
        object,
        (draft: {
          [x: string]: (Type[Extract<keyof Type, string>] & object) | (Type[Extract<keyof Type, string>] & null);
        }) => {
          for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
              const value = object[key];

              // @ts-ignore
              if (value?.__isSet) {
                // @ts-ignore
                draft[key] = new Set(value.value as any);
                // @ts-ignore
              } else if (typeof value === 'object') {
                // @ts-ignore
                draft[key] = deserialize(value);
              }
            }
          }
        }
      );
}

// See https://immerjs.github.io/immer/complex-objects/
function getIsImmerable(object: any) {
  const isPlainObject = !!object && Object.getPrototypeOf(object) === Object.prototype;
  const isMap = object instanceof Map;
  const isSet = object instanceof Set;
  const isImmerable = !!object && object[immerable] === true;

  return isPlainObject || isMap || isSet || isImmerable;
}

export const clear = () => localforage.clear();
