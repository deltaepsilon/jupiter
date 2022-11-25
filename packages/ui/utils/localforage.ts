import { SyncTask, SyncTasks, syncTaskSchema } from 'data/sync';
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
  SyncTasks = 'sync-tasks',
}

export interface LocalforageDataTypeMapping {
  [LocalforageDataType.SyncTasks]: SyncTasks;
}

// Sync Tasks
export async function getSyncTask(id: string) {
  const syncTasks = await getSyncTasks();

  return syncTasks ? syncTasks[id] : null;
}
export async function addSyncTask(id: string, task: SyncTask) {
  const syncTasks = await getSyncTasks();

  return setSyncTasks({ ...syncTasks, [id]: task });
}
export async function updateSyncTask(id: string, updates: Partial<SyncTask>) {
  const syncTasks = await getSyncTasks();
  const syncTask = syncTasks ? syncTasks[id] : null;
  const updatedSyncTask = syncTaskSchema.parse({ ...syncTask, ...updates });

  await setSyncTasks({ ...syncTasks, [id]: updatedSyncTask });

  return updatedSyncTask;
}
export async function removeSyncTask(id: string) {
  const syncTasks = await getSyncTasks();

  if (syncTasks && syncTasks[id]) {
    const { [id]: _, ...newSyncTasks } = syncTasks;

    setSyncTasks(newSyncTasks);

    return true;
  } else {
    console.warn(`Could not find sync task with id ${id}`);

    return false;
  }
}
export async function clearSyncTasks() {
  return localforage.removeItem(LocalforageDataType.SyncTasks);
}
const getSyncTasks = createGetter<SyncTasks | null>(LocalforageDataType.SyncTasks, null);
const setSyncTasks = createSetter<SyncTasks>(LocalforageDataType.SyncTasks);

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
