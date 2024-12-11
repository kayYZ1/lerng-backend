import { Body, Controller, Param, Post } from '@nestjs/common';
import { EmailMessageDto } from './dto/email-message.dto';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/test')
  sendTestMail(@Body() dto: MailDto) {
    return this.mailService.sendTestMail(dto.email);
  }

  @Post('/send/:id')
  sendEmailMessage(@Body() dto: EmailMessageDto, @Param('id') id: string) {
    return this.mailService.sendEmailToInstructor(id, dto);
  }
}
