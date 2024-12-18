import { BadRequestException, Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { v4 as uuidv4 } from 'uuid'
import * as fs from 'fs-extra';
import { ConfigService } from "@nestjs/config";
import * as path from 'path';
import { error } from "console";

@Injectable()
export class DocUploadService {
    private drive: any;
    private readonly uploadDir = path.join(process.cwd(), 'uploads');

    constructor(){
        fs.ensureDirSync(this.uploadDir);
    }

    async uploadFile(file: Express.Multer.File, folder: string = 'default'): Promise<string> {
        // validate file
        if(!file) {
            throw new BadRequestException('No file uploaded');
        }

        // validate file type
        const allowedMimeTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if(!allowedMimeTypes.includes(file.mimetype)){
            throw new BadRequestException('Invalid file type!!!!!!!!!!! ONLY PDF AND DOCs')
        }

        // create folder
        const folderPath = path.join(this.uploadDir, folder);
        fs.ensureDirSync(folderPath);

        // Generate unique filename
        const filename =`${uuidv4()}${path.extname(file.originalname)}`;
        const filePath = path.join(folderPath, filename)

        // save file
        await fs.writeFile(filePath, file.buffer);

        return `/uploads/${folder}/${filename}`;
    }

    async deleteFile(fileUrl: string): Promise<void> {
        if (!fileUrl) return;
    
        const fullPath = path.join(process.cwd(), fileUrl.slice(1));
        
        try {
          await fs.unlink(fullPath);
        } catch (error) {
          // File might not exist, which is fine
          console.warn(`Failed to delete file: ${fileUrl}`, error);
        }
    }
















    // constructor(private configService: ConfigService) {
    //     const credentialsJson = resolve(process.cwd(), 'credentials.json');
    //     console.log('Resolved credentials path:',credentialsJson);

    //     if (!fs.existsSync(credentialsJson)) {
    //         throw new Error('Credentials file not found');
    //     }

    //     let credentials;
    //     try {
    //         credentials = JSON.parse(fs.readFileSync(credentialsJson, 'utf8'));
    //     } catch (error) {
    //         throw new Error('Failed to parse credentials file');
    //     }

    //     if(credentials.type !== 'service_account') {
    //         throw new Error('Invalid credentials file: expected service account credentials' );
    //     }

    //     // const { installed } = credentials;
    //     // if ( !installed || !installed.client_id || !installed.client_secret || !installed.redirect_uris ) {
    //     //     throw new Error('Invalid credentials file');
    //     // }
        
    //     const auth = new google.auth.GoogleAuth({
    //         credentials: credentials,
    //         scopes: ['https://www.googleapis.com/auth/drive'],
    //     });

    //     this.drive = google.drive({ version: 'v3', auth });
    // }

    // async uploadFile(filepath: string, fileName: string) {
    //     const fileMetadata = {
    //         name: fileName,
    //     };
    //     const media = {
    //         mimeType: 'application/pdf',
    //         body: fs.createReadStream(filepath),
    //     };

    //     const response = await this.drive.files.create({
    //         resource: fileMetadata,
    //         media: media,
    //         fields: 'id',
    //     });

    //     return response.data.id;
    // }
}