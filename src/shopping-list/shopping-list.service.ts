import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ShoppingList } from 'src/schemas/shopping-list.schema';
import { PostShoppingListDto } from './dto/postShoppingList.dto';
import { PatchShoppingListItemDto } from './dto/patchShoppingListItem.dto';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList.name)
    private shoppingListModel: Model<ShoppingList>,
  ) {}

  async createShoppingList(
    postShoppingListDto: PostShoppingListDto,
  ): Promise<ShoppingList> {
    return this.shoppingListModel.create(postShoppingListDto);
  }
  async getShoppingListByUserId(userId: String): Promise<ShoppingList[]> {
    return await this.shoppingListModel.find({
      $or: [{ ownerId: userId }, { sharedWith: userId }],
    });
  }

  async addItem(
    shoppingListId: ObjectId,
    patchShoppingListItemDto: PatchShoppingListItemDto,
  ) {
    return await this.shoppingListModel.findByIdAndUpdate(shoppingListId, {
      $push: {
        ingredients: patchShoppingListItemDto,
      },
    });
  }
}
