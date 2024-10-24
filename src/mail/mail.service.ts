import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendTestMail(email: string) {
    const message = 'Hello this is the test mail!';

    await this.mailerService.sendMail({
      from: 'lms-linux<@noreply>',
      to: email,
      subject: 'Test email!',
      template: './forgot-password',
      context: {
        name: 'SIEMA',
        confirmation_url: message,
      },
      text: message,
    });
  }

  async sendPasswordResetMail(email: string, resetLink: string) {
    await this.mailerService.sendMail({
      from: 'lms-linux<@noreply>',
      to: email,
      subject: 'Reset password confirmation',
      template: './forgot-password',
      context: {
        name: email,
        confirmation_url: resetLink,
      },
    });
  }
}
