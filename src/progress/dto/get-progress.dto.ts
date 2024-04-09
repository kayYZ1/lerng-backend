import { IsNotEmpty, IsUUID } from "class-validator";

export class GetProgressDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}