import { MaxLength, MinLength, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDataDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Email too short',
  })
  @MaxLength(50, {
    message: 'Email too long.',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Username is too short.',
  })
  @MaxLength(25, {
    message: 'Username is too long',
  })
  username: string;
}
