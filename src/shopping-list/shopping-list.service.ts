import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId, Schema } from 'mongoose';
import { ShoppingList } from 'src/schemas/shopping-list.schema';
import { PostShoppingListDto } from './dto/postShoppingList.dto';
import { PatchShoppingListItemDto } from './dto/patchShoppingListItem.dto';
import { PatchUpdateSoppingListDto } from './dto/patchUpdateSoppingList.dto';
import { Ingredient } from 'src/schemas/ingredient.schema';

@Injectable()
export class ShoppingListService {
  constructor(
    @InjectModel(ShoppingList.name)
    private shoppingListModel: Model<ShoppingList>,
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<Ingredient>,
  ) {}

  async createShoppingList(
    postShoppingListDto: PostShoppingListDto,
  ): Promise<ShoppingList> {
    return this.shoppingListModel.create(postShoppingListDto);
  }
  async getShoppingListByUserId(userId: string): Promise<ShoppingList[]> {
    return await this.shoppingListModel
      .find({
        $or: [{ ownerId: userId }, { sharedWith: userId }],
      })
      .populate({
        path: 'ingredients.ingredient',
        select: 'name',
        model: 'Ingredient',
      });
  }

  async addItem(
    shoppingListId: ObjectId,
    patchShoppingListItemDto: PatchShoppingListItemDto,
  ) {
    const ingredient = await this.ingredientModel.findOneAndUpdate(
      { name: patchShoppingListItemDto.name },
      { name: patchShoppingListItemDto.name },
      { upsert: true, new: true },
    );

    return await this.shoppingListModel.findByIdAndUpdate(shoppingListId, {
      $push: {
        ingredients: {
          ingredient: ingredient.id,
          amount: patchShoppingListItemDto.amount,
        },
      },
    });
  }

  async getById(shoppingListId: Schema.Types.ObjectId) {
    return await this.shoppingListModel.findById(shoppingListId).populate({
      path: 'ingredients.ingredient',
      select: ['name', 'category'],
      model: 'Ingredient',
    });
  }

  async updateIsBought(
    ingredientObjectId: ObjectId,
    patchUpdateSoppingListDto: PatchUpdateSoppingListDto,
  ): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListModel.findOneAndUpdate(
      {
        'ingredients._id': ingredientObjectId,
      },
      {
        $set: {
          'ingredients.$.isBought': patchUpdateSoppingListDto.isBought,
        },
      },
    );
    return shoppingList;
  }

  async deleteItem(ingredientObjectId: Schema.Types.ObjectId) {
    const shoppingList = await this.shoppingListModel.findOneAndUpdate(
      { 'ingredients._id': ingredientObjectId },
      {
        $pull: {
          ingredients: {
            _id: ingredientObjectId,
          },
        },
      },
      {
        new: true,
      },
    );
    if (!shoppingList.ingredients.length) {
      const _id = new mongoose.Types.ObjectId(shoppingList._id);
      return await this.deleteShoppingList(_id);
    }
  }

  async updateAmount(
    ingredientObjectId: ObjectId,
    patchUpdateSoppingListDto: PatchUpdateSoppingListDto,
  ): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListModel.findOneAndUpdate(
      {
        'ingredients._id': ingredientObjectId,
      },
      {
        $set: {
          'ingredients.$.amount': patchUpdateSoppingListDto.amount,
        },
      },
    );
    return shoppingList;
  }

  async deleteShoppingList(shoppingListId: mongoose.Types.ObjectId) {
    return await this.shoppingListModel.findByIdAndDelete(shoppingListId);
  }
}
