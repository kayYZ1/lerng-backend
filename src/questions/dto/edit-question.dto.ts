import { IsNotEmpty, IsString } from 'class-validator';
import { QuestionType } from '../enums/question.enum';

export class EditQuestionDto {
  question: string;
  type: QuestionType;
  answer: string | boolean;

  @IsNotEmpty()
  @IsString()
  questionId: string;
}
