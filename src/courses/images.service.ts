/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { promises as fs } from "fs";
import { join } from "path";
import * as sharp from 'sharp'; 

@Injectable()
export class ImageService {
    private readonly uploadsPath = join(process.cwd(), 'uploads');

    constructor() { 
        this.ensureUploadsDirectory();
    }

    private async ensureUploadsDirectory() {
        try {
            await fs.mkdir(this.uploadsPath, { recursive: true });
        } catch (error) {
            console.error('Failed to create uploads directory:', error);
        }
    }

    async saveImage(file: Express.Multer.File){
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        if (!file.mimetype.includes('image')) {
            throw new BadRequestException('Only image files are allowed');
        }

        const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`;
        const filePath = join(this.uploadsPath, filename);  

        try {
            await sharp(file.buffer).resize(800, 600, {
                fit: 'inside',
                withoutEnlargement: true
            }).jpeg({ quality: 80 }).toFile(filePath);

            return filename;
        } catch (error) {
            console.error('Failed to save image:', error);
            throw new BadRequestException('Failed to save image');
        }

    }

    async deleteImage(filename: string) {
        if (!filename) return;

        const filePath = join(this.uploadsPath, filename);
        try {
            await fs.unlink(filePath);
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    }






}