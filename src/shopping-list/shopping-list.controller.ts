import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { PostShoppingListDto } from './dto/postShoppingList.dto';
import { ShoppingList } from 'src/schemas/shopping-list.schema';

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
}
