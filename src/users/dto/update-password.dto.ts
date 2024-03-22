import { MinLength, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short',
  })
  newPassword: string;
}
