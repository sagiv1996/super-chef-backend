import { IsString, IsNotEmpty } from 'class-validator';

export class GetIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
