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

  async getRecipesByIngredients(
    getRecipeByIngredientsDto: GetRecipeByIngredientsDto,
  ): Promise<Recipe[]> {
    const ingredientIds = getRecipeByIngredientsDto.ingredientIds;
    const matchPercent = getRecipeByIngredientsDto.matchPercent;
    const numMatches = Math.ceil(ingredientIds.length * (matchPercent / 100));

    const recipes = await this.recipeModel
      .find({
        'ingredients.id': ingredientIds,
      })
      .lean()
      .then((recipes) => {
        while (recipes.length === numMatches) {
          const randomIndex = Math.floor(Math.random() * recipes.length); // generate a random index
          recipes.splice(randomIndex, 1);
        }
        return recipes;
      });

    return recipes;
  }
}
