import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import format from 'date-fns/format';
import { z } from 'zod';

export const exifSchema = z.object({
  FileName: z.string(),
  FileType: z.string(),
  FileTypeExtension: z.string(),
  MIMEType: z.string(),
  ImageWidth: z.number().optional(),
  ImageHeight: z.number().optional(),
  CreateDate: z.string().optional(),
  ModifyDate: z.string().optional(),
  DateTimeOriginal: z.string().optional(),
  ImageSize: z.string().optional(),
  Megapixels: z.number().optional(),
});

export type Exif = z.infer<typeof exifSchema>;

export function dateToExifDate(dateOrString: Date | string, makeUTC = false) {
  const date = new Date(dateOrString);
  const standardizedDate = makeUTC ? addMinutes(date, date.getTimezoneOffset()) : date;

  return format(standardizedDate, 'yyyy:MM:dd HH:mm:ssxxx');
}

export function exifDateToDate(dateString?: string) {
  if (dateString) {
    const [datetime, timezone] = dateString.split(/[-|+]/);
    const [date, time] = datetime.split(' ');
    const [year, month, day] = date.split(':').map(Number);
    const [hour, minute, second] = time ? time.split(':').map(Number) : [0, 0, 0];
    const [tzHours, tzMinutes] = timezone ? timezone.split(':').map(Number) : [0, 0];
    let result = new Date(year, month - 1, day, hour, minute, second);

    if (timezone) {
      const tzDirection = dateString.includes('-') ? -1 : 1;

      result = addHours(result, tzDirection * tzHours);
      result = addMinutes(result, tzDirection * tzMinutes);
    }

    return result;
  }
}
