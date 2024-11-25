import { IsNotEmpty, IsString } from 'class-validator';

export class EmailMessageDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
