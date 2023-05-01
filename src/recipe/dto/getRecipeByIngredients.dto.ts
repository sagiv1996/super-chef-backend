import { IsArray, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongoose';

export class GetRecipeByIngredientsDto {
  @IsArray()
  @IsMongoId({ each: true })
  ingredientIds: ObjectId[];
}
