import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ingredient } from 'src/schemas/ingredient.schema';
import { GetIngredientDto } from './dto/getIngredient.dto';
import { Model } from 'mongoose';
import { PostIngredientDto } from './dto/postIngredient.dto';
import { IngredientCategory } from 'src/schemas/ingredientCategory.enum';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}

  async getIngredients(
    getIngredientDto: GetIngredientDto,
  ): Promise<Ingredient[]> {
    const ingredientName = getIngredientDto.name;
    const response = await this.ingredientModel.find({
      name: new RegExp(ingredientName),
    });
    return response;
  }

  async createIngredient(
    postIngredientDto: PostIngredientDto,
  ): Promise<Ingredient> {
    const newIngredient = await this.ingredientModel.create(postIngredientDto);
    return newIngredient;
  }

  getIngredientCategory() {
    return IngredientCategory;
  }
}
