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
    type: { hours: Number, minutes: Number }
  })
  preparationTime: {
    hours: number,
    minutes: number,
  };

  @Prop({
    type: [{ id: { type: Types.ObjectId, ref: 'Ingredient' }, amount: Number }],
    required: true,
  })
  ingredients: [
    {
      _id: false;

      id: { type: Types.ObjectId; ref: 'Ingredient' };
      amount: string;
    },
  ];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
