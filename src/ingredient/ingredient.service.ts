import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient } from 'schemas/ingredient.schema';
import { GetIngredientDto } from './dto/getIngredient.dto';
import { Model } from 'mongoose';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  async getIngredients(getIngredientDto: GetIngredientDto) {
    const ingredientName = getIngredientDto.name;
    const response = await this.ingredientModel.find({
      name: new RegExp(ingredientName),
    });
    return response;
  }
}
