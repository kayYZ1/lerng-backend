import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRatingDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
