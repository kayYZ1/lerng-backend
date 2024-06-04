import { Body, Controller, Get } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  sendTestMail(@Body() dto: MailDto) {
    return this.mailService.sendTestMail(dto.email);
  }
}
