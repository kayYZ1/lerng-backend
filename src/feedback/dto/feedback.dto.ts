import { IsNotEmpty, IsString } from 'class-validator';

export class FeedbackTicketDto {
  @IsNotEmpty()
  @IsString()
  problem: string;

  @IsNotEmpty()
  @IsString()
  details: string;

  @IsNotEmpty()
  @IsString()
  courseId: string;
}
