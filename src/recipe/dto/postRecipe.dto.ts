import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  ArrayMinSize,
  ValidateNested,
  IsMongoId,
  IsObject,
} from 'class-validator';
import { Types } from 'mongoose';
import { RecipeTag } from 'schemas/recipeTags.enum';
import { RecipeTimePreparationDto } from './recipeTimePreparation.dto';

class IngredientItem {
  @IsMongoId()
  id: Types.ObjectId;

  @IsString()
  amount: string;
}
export class PostRecipeDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @IsEnum(RecipeTag, { each: true })
  @IsOptional()
  tags: RecipeTag[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(3)
  steps: string[];

  @IsObject()
  @IsNotEmpty()
  preparationTime: RecipeTimePreparationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientItem)
  ingredients: IngredientItem[];
}
