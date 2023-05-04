import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
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
    type: [{ id: { type: Types.ObjectId, ref: 'Ingredient' }, amount: String }],
    required: true,
    _id: false,
  })
  ingredients: [
    {
      id: { type: Types.ObjectId; ref: 'Ingredient' };
      amount: string;
    },
  ];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
