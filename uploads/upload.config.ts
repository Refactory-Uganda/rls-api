// src/upload/upload.config.ts
import { MulterOptions } from '@nestjs/platform-express';

export const multerOptions: MulterOptions = {
  dest: './uploads',  // Files will be stored in the 'uploads' folder
  limits: {
    fileSize: 10 * 1024 * 1024,  // 10MB file size limit
  },
};
