import {
  IsMongoId,
  IsNumber,
  Min,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class PatchShoppingListItemDto {
  @ValidateIf((val) => !val.name)
  @IsMongoId()
  ingredient?: ObjectId;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @ValidateIf((val) => !val.ingredient)
  name?: string;
}
