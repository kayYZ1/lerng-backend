import { IsNotEmpty, IsString } from 'class-validator';

export class EditContentDto {
  title: string;
  description: string;
  paragraph150: string;
  paragraph300: string;
  videoUrl: string;

  @IsNotEmpty()
  @IsString()
  contentId: string;
}
