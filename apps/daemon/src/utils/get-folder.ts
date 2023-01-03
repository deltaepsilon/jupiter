import { MISSING_DATE_FOLDER } from 'data/daemon';
import path from 'path';

export function getFolderFromDate(dateOrString?: Date | string) {
  if (dateOrString) {
    const createdDate = new Date(dateOrString);

    return path.join(String(createdDate.getUTCFullYear()), String(createdDate.getUTCMonth() + 1).padStart(2, '0'));
  } else {
    return MISSING_DATE_FOLDER;
  }
}
