import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendEmail(user: any, recipient: string, subject: string, resetPasswordURL: string, templatePath: string): Promise<void>;
}
