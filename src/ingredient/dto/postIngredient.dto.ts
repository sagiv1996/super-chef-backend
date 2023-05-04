import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { IngredientType } from 'src/schemas/ingredientType.enum';

export class PostIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEnum(IngredientType)
  @IsNotEmpty()
  type: IngredientType;
}
