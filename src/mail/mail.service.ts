import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  // Function to send password reset email
  async sendEmail(
    user: any,
    recipient: string,
    subject: string,
    resetPasswordURL: string,
    templatePath: string,
  ) {
    await this.mailerService.sendMail({
      to: recipient,
      subject: subject,
      template: templatePath, 
      context: {
        name: user.email, 
        resetPasswordURL,
      },
    });
  }
}
