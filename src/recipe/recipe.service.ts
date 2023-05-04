import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Recipe } from 'schemas/recipe.schema';
import { PostRecipeDto } from './dto/postRecipe.dto';
import { GetRecipeByIngredientsDto } from './dto/getRecipeByIngredients.dto';
import { GetRescipesByFiltersDto } from './dto/getRecipesByFilters.dto';

interface GetRecipesQuery {
  ownerId?: string;

  name?: RegExp;

  tags?: string;

  preparationTime?: number;

  ingredientsIds?: ObjectId[];
}

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
    const recipes = await this.recipeModel
      .find({
        'ingredients.id': { $in: ingredientIds },
      })
      .lean();
    return recipes;
  }

  async getRecipeByName(recipeName: string): Promise<Recipe[]> {
    const recipe = await this.recipeModel
      .find({
        name: new RegExp(recipeName),
      })
      .limit(20);
    return recipe;
  }

  async getRecipesByFilters(
    getRecipesByFiltersDto: GetRescipesByFiltersDto,
  ): Promise<Recipe[]> {
    const { ownerId, name, preparationTime, tags, ingredientsIds } =
      getRecipesByFiltersDto;
    const query: GetRecipesQuery = {};
    if (ownerId) {
      query.ownerId = ownerId;
    }
    if (name) {
      query.name = new RegExp(name);
    }
    if (tags) {
      query.tags = `$and: ${tags}`;
    }
    const recipes = await this.recipeModel.find({ $and: [{ tags: [] }] });
    return recipes;
  }
}
