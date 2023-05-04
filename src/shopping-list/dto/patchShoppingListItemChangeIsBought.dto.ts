import { IsBoolean } from 'class-validator';

export class PatchShoppingListItemChangeIsBought {
  @IsBoolean()
  isBought: boolean;
}
