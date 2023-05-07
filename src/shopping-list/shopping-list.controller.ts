import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { PostShoppingListDto } from './dto/postShoppingList.dto';
import { ShoppingList } from 'src/schemas/shopping-list.schema';
import { ObjectId } from 'mongoose';
import { PatchShoppingListItemDto } from './dto/patchShoppingListItem.dto';
import { PatchUpdateIsBoughtDto } from './dto/patchUpdateIsBought.dto';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private shoppingListService: ShoppingListService) {}

  @Post()
  createShoppingList(
    @Body() postShoppingListDto: PostShoppingListDto,
  ): Promise<ShoppingList> {
    return this.shoppingListService.createShoppingList(postShoppingListDto);
  }

  @Get(':userId')
  getShoppingListByUserId(
    @Param('userId') userId: String,
  ): Promise<ShoppingList[]> {
    return this.shoppingListService.getShoppingListByUserId(userId);
  }

  @Patch('add-item/:shoppingListId')
  addItem(
    @Param('shoppingListId') shoppingListId: ObjectId,
    @Body() patchShoppingListItemDto: PatchShoppingListItemDto,
  ) {
    return this.shoppingListService.addItem(
      shoppingListId,
      patchShoppingListItemDto,
    );
  }

  @Get('get-by-id/:shoppingListId')
  getById(@Param('shoppingListId') shoppingListId: ObjectId) {
    return this.shoppingListService.getById(shoppingListId);
  }

  @Patch(':ingredientObjectId')
  updateIsBought(
    @Param('ingredientObjectId') ingredientObjectId: ObjectId,
    @Body() patchUpdateIsBoughtDto: PatchUpdateIsBoughtDto,
  ) {
return this.shoppingListService.updateIsBought(
  ingredientObjectId,
  patchUpdateIsBoughtDto,
);
  }
}
