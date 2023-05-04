import { Module } from '@nestjs/common';
import { ShoppingListController } from './shopping-list.controller';
import { ShoppingListService } from './shopping-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShoppingList,
  ShoppingListSchema,
} from 'src/schemas/shopping-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShoppingList.name, schema: ShoppingListSchema },
    ]),
  ],
  controllers: [ShoppingListController],
  providers: [ShoppingListService],
})
export class ShoppingListModule {}
