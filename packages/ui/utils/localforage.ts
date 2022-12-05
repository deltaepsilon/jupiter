import { DirectoryHandle, DirectoryHandleMap } from 'ui/hooks';
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
  DirectoryHandles = 'directory-handles',
}

export interface LocalforageDataTypeMapping {
  [LocalforageDataType.DirectoryHandles]: DirectoryHandleMap;
}

// Sync Tasks
export async function getDirectoryHandle(id: string) {
  const directoryHandlesMap = await getDirectoryHandles();

  return directoryHandlesMap.get(id) ?? null;
}
export async function setDirectoryHandle(id: string, handle: DirectoryHandle) {
  const directoryHandles = await getDirectoryHandles();
  const updated = new Map(directoryHandles);

  updated.set(id, handle);

  return setDirectoryHandles(updated);
}
export async function clearDirectoryHandles() {
  return localforage.removeItem(LocalforageDataType.DirectoryHandles);
}
const getDirectoryHandles = createGetter<DirectoryHandleMap>(LocalforageDataType.DirectoryHandles, new Map());
const setDirectoryHandles = createSetter<DirectoryHandleMap>(LocalforageDataType.DirectoryHandles);

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

            draft[key] = { __isSet: true, value: Array.from(set) } as unknown as Type[Extract<keyof Type, string>];
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
