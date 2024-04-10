import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  newPassword: string;
}
