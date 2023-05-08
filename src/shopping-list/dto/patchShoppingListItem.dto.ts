import {
  IsMongoId,
  IsNumber,
  Min,
  IsString,
  ValidateIf,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class PatchShoppingListItemDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  name: string;
}
