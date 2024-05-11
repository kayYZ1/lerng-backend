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
  paragraph150: string;

  @IsNotEmpty()
  @IsString()
  paragraph300: string;

  imageUrl: string;

  videoUrl: string;
}
