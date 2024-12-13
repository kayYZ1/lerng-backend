import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { EmailMessageDto } from './dto/email-message.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UsersService,
  ) {}

  async sendTestMail(email: string) {
    const message = 'Hello this is the test mail!';

    await this.mailerService.sendMail({
      from: 'lerng-test@lerng.site',
      to: email,
      subject: 'Test email!',
      template: './forgot-password',
      context: {
        name: 'Testing email sending',
        confirmation_url: message,
      },
      text: message,
    });
  }

  async sendEmailToInstructor(instructorId: string, dto: EmailMessageDto) {
    const userExist = await this.userService.findOne(instructorId);

    if (!userExist || userExist.role !== 'instructor')
      throw new BadRequestException('Instructor does not exist');

    await this.mailerService.sendMail({
      from: 'email-message@lerng.site',
      to: userExist.email,
      subject: `Message from one of the students: ${dto.topic}`,
      template: './email-message',
      context: {
        sender: dto.sender,
        message: dto.message,
      },
    });
  }

  async sendPasswordResetMail(email: string, resetLink: string) {
    await this.mailerService.sendMail({
      from: 'password-reset@lerng.site',
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
