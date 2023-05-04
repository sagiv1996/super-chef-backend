import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShoppingList } from 'schemas/shopping-list.schema';
import { PostShoppingListDto } from './dto/postShoppingList.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList.name)
    private shoppingListModel: Model<ShoppingList>,
  ) {}

  async createShoppingList(postShoppingListDto: PostShoppingListDto): Promise<ShoppingList> {
    return this.shoppingListModel.create(postShoppingListDto);
  }
}
