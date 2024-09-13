import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Categories } from '../enum/courses.enum';

export class EditCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsArray()
  categories: Categories[];

  @IsString()
  @IsNotEmpty()
  courseId: string;
}
