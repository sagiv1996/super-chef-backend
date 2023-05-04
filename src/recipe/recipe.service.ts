import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Recipe } from 'schemas/recipe.schema';
import { PostRecipeDto } from './dto/postRecipe.dto';
import { GetRecipesByFiltersDto } from './dto/getRecipesByFilters.dto';
import { GetRecipesQuery } from './interfaces/GetRecipesQuery';
import { LimitAndSkipDto } from 'src/globalDto/LimitAndSkip.Dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async createRecipe(postRecipeDto: PostRecipeDto): Promise<Recipe> {
    const newRecipe = await this.recipeModel.create(postRecipeDto);
    return newRecipe;
  }
  async getRecipeById(id: ObjectId): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(id);
    return recipe;
  }

  async getRecipesByFilters(
    getRecipesByFiltersDto: GetRecipesByFiltersDto,
    limitAndSkipDto: LimitAndSkipDto,
  ): Promise<Recipe[]> {
    const { skip, limit }: { skip: number; limit: number } = limitAndSkipDto;
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
      query.tags = { $all: tags };
    }
    if (preparationTime) {
      query.preparationTime = { $lte: preparationTime };
    }
    if (ingredientsIds) {
      query.ingredientsIds = { $all: ingredientsIds };
    }
    const recipes = await this.recipeModel.find(query).limit(limit).skip(skip);
    return recipes;
  }
}
