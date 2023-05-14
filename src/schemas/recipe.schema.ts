import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { RecipeTag } from './recipeTags.enum';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
export class Recipe {
  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  tags: RecipeTag[];

  @Prop()
  imageUrl: string;

  @Prop({ required: true })
  steps: string[];

  @Prop({
    type: Number,
  })
  preparationTimeInMinutes: number;

  @Prop({
    type: [
      {
        ingredient: {
          type: Types.ObjectId,
          ref: 'Ingredient',
          required: true,
        },
        amount: { type: Number, min: 1, required: true },
      },
    ],
  })
  ingredients: [
    {
      ingredient: ObjectId;
      amount: number;
    },
  ];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
