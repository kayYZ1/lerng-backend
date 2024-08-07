import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TicketStatus } from '../enum/feedback.enum';

export class TicketStatusDto {
  @IsNotEmpty()
  @IsString()
  feedbackId: string;

  @IsEnum(TicketStatus)
  status: TicketStatus;

  @IsNotEmpty()
  @IsString()
  feedbackMessage: string;
}
