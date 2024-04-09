import { PartialType } from '@nestjs/mapped-types';
import { GetProgressDto } from './get-progress.dto';

export class SaveProgressDto extends PartialType(GetProgressDto) {
  quizScore: number;

  progressScore: number;
}
