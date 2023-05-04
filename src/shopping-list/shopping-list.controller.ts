import { Body, Controller, Post } from '@nestjs/common';
import { ShoppingListService } from './shopping-list.service';
import { PostShoppingListDto } from './dto/postShoppingList.dto';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private shoppingListService: ShoppingListService) {}

  @Post()
  createShoppingList(@Body() postShoppingListDto: PostShoppingListDto) {
    return this.shoppingListService.createShoppingList(postShoppingListDto);
  }
}
