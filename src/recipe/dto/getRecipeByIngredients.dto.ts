import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetRecipeByIngredientsDto {
  @IsArray()
  @IsMongoId({ each: true })
  ingredientIds: ObjectId[];

  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  matchPercent: 100;
}
