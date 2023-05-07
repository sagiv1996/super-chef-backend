import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { ShoppingList } from 'src/schemas/shopping-list.schema';
import { PostShoppingListDto } from './dto/postShoppingList.dto';
import { PatchShoppingListItemDto } from './dto/patchShoppingListItem.dto';
import { PatchUpdateIsBoughtDto } from './dto/patchUpdateIsBought.dto';
import { Ingredient } from 'src/schemas/ingredient.schema';
import { IngredientModule } from 'src/ingredient/ingredient.module';

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
  async getShoppingListByUserId(userId: String): Promise<ShoppingList[]> {
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
    const isExist = await this.ingredientModel.exists({
      _id: patchShoppingListItemDto.ingredient,
    });
    let ingredient;
    if (!isExist) {
      ingredient = await this.ingredientModel.create({
        name: patchShoppingListItemDto.name,
      });
    }

    const newIngredientDto: PatchShoppingListItemDto = {
      ingredient: ingredient._id,
      amount: patchShoppingListItemDto.amount,
    };
    return await this.shoppingListModel.findByIdAndUpdate(shoppingListId, {
      $push: {
        ingredients: isExist ? patchShoppingListItemDto : newIngredientDto,
      },
    });
  }

  async getById(shoppingListId: Schema.Types.ObjectId) {
    return await this.shoppingListModel.findById(shoppingListId).populate({
      path: 'ingredients.ingredient',
      select: 'name',
      model: 'Ingredient',
    });
  }

  async updateIsBought(
    ingredientObjectId: ObjectId,
    patchUpdateIsBoughtDto: PatchUpdateIsBoughtDto,
  ): Promise<ShoppingList> {
    const shoppingList = await this.shoppingListModel.findOneAndUpdate(
      {
        'ingredients._id': ingredientObjectId,
      },
      {
        $set: {
          'ingredients.$.isBought': patchUpdateIsBoughtDto.isBought,
        },
      },
    );
    return shoppingList;
  }
}
