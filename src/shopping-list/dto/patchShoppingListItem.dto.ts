import {
  IsMongoId,
  IsNumber,
  IsOptional,
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
  @Min(0)
  amount: number;

  @IsString()
  @ValidateIf((val) => !val.ingredient)
  name?: string;
}
