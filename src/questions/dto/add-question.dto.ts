import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { QuestionType } from '../enums/question.enum';

export class AddQuestionDto {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsEnum(QuestionType)
  type: QuestionType;
  
  @IsNotEmpty()
  answer: string | boolean;
}
