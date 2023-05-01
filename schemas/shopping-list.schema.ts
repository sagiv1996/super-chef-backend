import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShoppingListDocument = HydratedDocument<ShoppingList>;

@Schema()
export class ShoppingList {
  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  isCompleted: boolean;
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
