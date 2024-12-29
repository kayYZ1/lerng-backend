import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserImageDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;
}
