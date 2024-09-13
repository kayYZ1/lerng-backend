import { IsArray, IsNotEmpty, IsString } from 'class-validator';

import { Categories } from '../enum/courses.enum';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  categories: Categories[];

  @IsString()
  imageUrl: string;
}
