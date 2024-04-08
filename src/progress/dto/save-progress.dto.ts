import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class SaveProgressDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  quizScore: number;

  progressScore: number;
}