/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { google } from 'googleapis';
import { join } from 'path';
import * as sharp from 'sharp';
import { Readable } from 'stream';

@Injectable()
export class ImageService {
  private readonly uploadsPath = join(process.cwd(), 'uploads');
  private drive: any;

  constructor() {
    this.ensureUploadsDirectory();
    this.initializeGoogleDrive();
  }


  private async ensureUploadsDirectory() {
    try {
      await fs.mkdir(this.uploadsPath, { recursive: true });
    } catch (error) {
      console.error('Failed to create uploads directory:', error);
    }
  }

  private async uploadsDirectory() {
    try {
      await fs.mkdir(this.uploadsPath, { recursive: true });
    } catch (error) {
      console.error('Failed to create uploads directory:', error);
    }
  }

  private initializeGoogleDrive() {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: ['https://www.googleapis.com/auth/drive.file'],
      });
      this.drive = google.drive({ version: 'v3', auth });
    } catch (error) {
      console.error('Failed to initialize Google Drive:', error);
    }
  }

  async saveImage(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!file.mimetype.includes('image')) {
      throw new BadRequestException('Only image files are allowed');
    }

    const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;
    const filePath = join(this.uploadsPath, filename);

    try {
      await sharp(file.buffer)
        .resize(800, 600, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80 })
        .toFile(filePath);

        const fileMetadata = {
          name: filename,
        };
        const media = {
          mimeType: file.mimetype,
          body: Readable.from(file.buffer),
        };
        
        const driveResponse = await this.drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: 'id',
        })

        await fs.unlink(filePath); // Delete the local file

      return driveResponse.data.id;
    } catch (error) {
      console.error('Failed to save image:', error);
      throw new BadRequestException('Failed to save image');
    }
  }

  async deleteImage(fileId: string) {
    if (!fileId) return;

    // const filePath = join(this.uploadsPath, fileId);
    try {
      await this.drive.files.delete({ fileId: fileId });
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  }

  async imageDetails(fileId: string) {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType, size, webContentLink, webViewLink',
      });
      return response.data;
    }catch (error) {
      console.error('Failed to get image details:', error);
    }
  }
}
