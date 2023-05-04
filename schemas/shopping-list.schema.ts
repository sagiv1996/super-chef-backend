import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ShoppingListDocument = HydratedDocument<ShoppingList>;

@Schema()
export class ShoppingList {
  @Prop({ required: true, type: String })
  ownerId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ type: String })
  sharedWith: string[];

  @Prop({
    type: [
      {
        id: { type: Types.ObjectId, ref: 'Ingredient', required: true },
        amount: { type: Number, min: 1, required: true },
        isBought: { type: Boolean, default: false, required: true },
      },
    ],
    _id: false,
  })
  ingredients: [
    {
      id: { type: Types.ObjectId; ref: 'Ingredient' };
      amount: number;
      isBought: boolean;
    },
  ];
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
