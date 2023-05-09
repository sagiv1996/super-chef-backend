import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { IngredientCategory } from 'src/schemas/ingredientCategory.enum';

export class PostIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEnum(IngredientCategory)
  @IsNotEmpty()
  category: IngredientCategory;
}
