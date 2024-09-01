import { IsNotEmpty, IsString } from 'class-validator';

export class EditCourseDto {
  title: string;
  description: string;
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;
}
