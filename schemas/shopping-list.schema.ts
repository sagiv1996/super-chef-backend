import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ShoppingListStatus } from './shopping-list-status.enum';

export type ShoppingListDocument = HydratedDocument<ShoppingList>;

@Schema()
export class ShoppingList {
  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: ShoppingListStatus;
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
