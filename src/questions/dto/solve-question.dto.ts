import { IsNotEmpty } from "class-validator";

export class SolveQuestionDto {
  @IsNotEmpty()
  questionAnswer: string | Boolean;
}