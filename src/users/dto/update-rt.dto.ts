import { IsString } from 'class-validator';

export class UpdateRtDto {
  @IsString()
  refreshToken: string;
}
