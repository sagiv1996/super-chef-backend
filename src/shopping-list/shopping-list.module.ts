import { Module } from '@nestjs/common';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListService } from './shopping-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShoppingList,
  ShoppingListSchema,
} from 'src/schemas/shopping-list.schema';
import { Ingredient, IngredientSchema } from 'src/schemas/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingList.name, schema: ShoppingListSchema },
    ]),
    MongooseModule.forFeature([
      {
        name: Ingredient.name,
        schema: IngredientSchema,
      },
    ]),
  ],
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
})
export class ShoppingListModule {}
