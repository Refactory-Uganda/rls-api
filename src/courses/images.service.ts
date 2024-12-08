/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { google } from 'googleapis';
import { join } from 'path';
import * as sharp from 'sharp';
import * as mime from 'mime-types';
import * as stream from 'stream';
import { Readable } from 'stream';

@Injectable()
export class ImageService {
  private drive = google.drive('v3');
  private readonly uploadsPath = join(process.cwd(), 'uploads');
  private readonly credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf-8'));

  constructor() {
    this.ensureUploadsDirectory();
    this.setupGoogleDrive()
  }

  private async setupGoogleDrive() {
    try{
      const jwtClient = new google.auth.JWT(
        this.credentials.client_email,
        undefined,
        this.credentials.private_key,
        ['https://www.googleapis.com/auth/drive'],
        undefined
      );
      //  Initialise Google drive
      await jwtClient.authorize();
      this.drive = google.drive({ version: 'v3', auth: jwtClient });
    }catch (error) {
      console.error('Failed to setup Google Drive:', error);
      throw new BadRequestException('Failed to setup Google Drive');
    }
  }





  private async ensureUploadsDirectory() {
    try {
      await fs.promises.mkdir(this.uploadsPath, { recursive: true });
    } catch (error) {
      console.error('Failed to create uploads directory:', error);
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

    try {
      // convert buffer to readable stream
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);
      
      // Resize image before uploading
      const resizedBuffer = await sharp(file.buffer)
        .resize(800, 600, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 80 })
        .toBuffer();

        const mimeType = mime.lookup(file.originalname) || 'image/jpeg';

        // prepare metadata to Upload the Image 
        const fileMetadata = {
          name: filename,
          mimeType: mimeType,
          // parents: [this.googleDriveFolderId],
        };

        // upload to drive
        const mediaStream = new stream.Readable({
          read() {
            this.push(resizedBuffer);
            this.push(null);
          },
        })
        const driveFile = await this.drive.files.create({
          requestBody: fileMetadata,
          media: {
            mimeType: mimeType,
            body: mediaStream
          },
          fields: 'id, name, webContentLink',
        });

        await this.drive.permissions.create({
          fileId: driveFile.data.id,
          requestBody: {
            role: 'reader',
            type: 'anyone',
          },
        });

      return { 
        fileId: driveFile.data.id, 
        filename: driveFile.data.name, 
        webContentLink: driveFile.data.webContentLink 
      };
    } catch (error) {
      console.error('Failed to save image:', error);
      throw new BadRequestException('Failed to save image');
    }
  }

  async deleteImage(filename: string) {
    if (!filename) return;
    try {
      const res = await this.drive.files.list({
        q: `name = '${filename}'`,
        fields: 'files(id)',
      });
      const file = res.data.files[0];
      if (file && file.id){
        await this.drive.files.delete({ fileId: file.id });
      }else {
        console.error('File not found:', filename);
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  }
}
