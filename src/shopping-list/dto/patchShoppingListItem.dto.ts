import { IsMongoId, IsNumber, Min, min } from 'class-validator';
import { ObjectId } from 'mongoose';

export class PatchShoppingListItemDto {
  @IsMongoId()
  id: ObjectId;

  @IsNumber()
  @Min(0)
  amount: number;
}
