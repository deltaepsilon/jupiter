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
