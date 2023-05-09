import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IngredientCategory } from './ingredientCategory.enum';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  category: IngredientCategory;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
