import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import * as fs from 'fs';
import { ConfigService } from "@nestjs/config";
import { resolve } from "path";
import { error } from "console";

@Injectable()
export class DocUploadService {
    private drive: any;

    constructor(private configService: ConfigService) {
        const credentialsJson = resolve(process.cwd(), 'credentials.json');
        console.log('Resolved credentials path:',credentialsJson);

        if (!fs.existsSync(credentialsJson)) {
            throw new Error('Credentials file not found');
        }

        let credentials;
        try {
            credentials = JSON.parse(fs.readFileSync(credentialsJson, 'utf8'));
        } catch (error) {
            throw new Error('Failed to parse credentials file');
        }

        if(credentials.type !== 'service_account') {
            throw new Error('Invalid credentials file: expected service account credentials' );
        }

        // const { installed } = credentials;
        // if ( !installed || !installed.client_id || !installed.client_secret || !installed.redirect_uris ) {
        //     throw new Error('Invalid credentials file');
        // }
        
        const auth = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        this.drive = google.drive({ version: 'v3', auth });
    }

    async uploadFile(filepath: string, fileName: string) {
        const fileMetadata = {
            name: fileName,
        };
        const media = {
            mimeType: 'application/pdf',
            body: fs.createReadStream(filepath),
        };

        const response = await this.drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        return response.data.id;
    }
}