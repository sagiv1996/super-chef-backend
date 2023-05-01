import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Recipe } from 'schemas/recipe.schema';
import { PostRecipeDto } from './dto/postRecipe.dto';
import { GetRecipeByIngredientsDto } from './dto/getRecipeByIngredients.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async createRecipe(postRecipeDto: PostRecipeDto): Promise<Recipe> {
    const newRecipe = await this.recipeModel.create(postRecipeDto);
    return newRecipe;
  }

  async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find().limit(50);
    return recipes;
  }

  async getRecipeById(id: ObjectId): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(id);
    return recipe;
  }

  async getRecipeByIngredients(
    getRecipeByIngredientsDto: GetRecipeByIngredientsDto,
  ): Promise<ObjectId[]> {
    const ingredientIds = getRecipeByIngredientsDto.ingredientIds;
    const recipeIds = await this.recipeModel.distinct('id', {
      ingredients: {
        $all: ingredientIds.map((id) => ({ $elemMatch: { id } })),
      },
    });
    return recipeIds;
  }
}
