import { IsNotEmpty, IsString } from 'class-validator';

export class NewContentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  textFirst: string;

  @IsNotEmpty()
  @IsString()
  textSecond: string;

  imageUrl: string;

  videoUrl: string;
}
