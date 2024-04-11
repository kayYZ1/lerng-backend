import { IsNotEmpty, IsNumber } from 'class-validator';

export class SaveQuizScoreDto {
  @IsNotEmpty()
  @IsNumber()
  quizScore: number;
}
