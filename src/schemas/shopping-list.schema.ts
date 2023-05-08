import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type ShoppingListDocument = HydratedDocument<ShoppingList>;

@Schema()
export class ShoppingList {
  @Prop({ required: true, type: String })
  ownerId: string;

  @Prop({ required: true, index: true, unique: true })
  name: string;

  @Prop({ type: String })
  sharedWith: string[];

  @Prop({
    type: [
      {
        ingredient: {
          type: Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        amount: { type: Number, min: 1, required: true },
        isBought: { type: Boolean, default: false, required: true },
      },
    ],
  })
  ingredients: [
    {
      ingredient: ObjectId;
      amount: number;
      isBought: boolean;
    },
  ];
}

export const ShoppingListSchema = SchemaFactory.createForClass(ShoppingList);
