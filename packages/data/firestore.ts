import { Timestamp } from 'firebase/firestore/lite';
import { z } from 'zod';

export const firestoreDate = z.preprocess((arg) => {
  if (arg instanceof Timestamp) {
    return arg.toDate();
  } else if (arg instanceof Date) {
    return arg;
  } else if (typeof arg === 'string') {
    return new Date(arg);
    //@ts-ignore
  } else if (typeof arg.toDate === 'function') {
    //@ts-ignore
    return arg.toDate();
  }

  return undefined;
}, z.date().optional());
