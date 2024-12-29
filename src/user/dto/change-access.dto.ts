import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserAccess } from '../enums/user.enum';

export class ChangeUserAccessDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsEnum(UserAccess)
  access: UserAccess;
}
