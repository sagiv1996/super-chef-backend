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
  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  name: string;
}
