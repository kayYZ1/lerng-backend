import { IsNotEmpty, IsString } from 'class-validator';

export class EditTopicDto {
  title: string;

  description: string;

  @IsNotEmpty()
  @IsString()
  topicId: string;
}