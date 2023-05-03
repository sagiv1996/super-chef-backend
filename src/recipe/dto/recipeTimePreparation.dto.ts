import { IsNumber } from 'class-validator';

export class RecipeTimePreparationDto {
  @IsNumber()
  hours: number;

  @IsNumber()
  minutes: number;
}
