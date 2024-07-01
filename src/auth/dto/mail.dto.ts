import { IsNotEmpty, IsString } from 'class-validator';

export class MailDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
