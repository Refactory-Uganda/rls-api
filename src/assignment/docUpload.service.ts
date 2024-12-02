import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import * as fs from 'fs';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DocUploadService {
    private drive: any;

    constructor(private configService: ConfigService) {
        const credentials = JSON.parse(this.configService.get<string>('GOOGLE_CREDENTIALS'));
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        oAuth2Client.setCredentials({
            refresh_token: this.configService.get<string>('GOOGLE_REFRESH_TOKEN'),
        });

        this.drive = google.drive({ version: 'v3', auth: oAuth2Client });
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