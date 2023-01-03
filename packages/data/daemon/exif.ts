import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import { z } from 'zod';

export const exifSchema = z.object({
  FileName: z.string(),
  FileType: z.string(),
  FileTypeExtension: z.string(),
  MIMEType: z.string(),
  ImageWidth: z.number().optional(),
  ImageHeight: z.number().optional(),
  ModifyDate: z.string().optional(),
  ImageSize: z.string().optional(),
  Megapixels: z.number().optional(),
});

export type Exif = z.infer<typeof exifSchema>;

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
