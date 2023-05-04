import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  ArrayMinSize,
  ValidateNested,
  IsNumber,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';
import { RecipeTag } from 'src/schemas/recipeTags.enum';

class IngredientItem {
  @IsMongoId()
  id: Types.ObjectId;

  @IsNumber()
  amount: number;
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

  @IsString()
  @IsNotEmpty()
  preparationTime: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientItem)
  ingredients: IngredientItem[];
}
