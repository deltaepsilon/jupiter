import { INVALID_DATE_FOLDER, MISSING_DATE_FOLDER } from 'data/daemon';

import path from 'path';

export function getFolderFromDate(dateOrString?: Date | string) {
  if (dateOrString) {
    const createdDate = new Date(dateOrString);
    const isValid = isValidDate(createdDate);

    return isValid
      ? path.join(String(createdDate.getUTCFullYear()), String(createdDate.getUTCMonth() + 1).padStart(2, '0'))
      : INVALID_DATE_FOLDER;
  } else {
    return MISSING_DATE_FOLDER;
  }
}

function isValidDate(d: unknown) {
  // @ts-ignore
  return d instanceof Date && !isNaN(d);
}
