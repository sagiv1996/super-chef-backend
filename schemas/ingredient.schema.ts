import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IngredientType } from './ingredientType.enum';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  type: IngredientType;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
