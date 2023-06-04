import { IsMongoId, IsNumber, Min } from 'class-validator';
import { ObjectId } from 'mongoose';

export class PatchShoppingListItemsDto {
  @IsMongoId()
  _id: ObjectId;

  @IsNumber()
  //   @Min(1)
  amount: number;
}
