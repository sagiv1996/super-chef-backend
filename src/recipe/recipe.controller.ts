import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PostRecipeDto } from './dto/postRecipe.dto';
import { Recipe } from 'schemas/recipe.schema';
import { RecipeService } from './recipe.service';
import { ObjectId } from 'mongoose';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Post()
  createRecipe(@Body() body: PostRecipeDto): Promise<Recipe> {
    return this.recipeService.createRecipe(body);
  }

  @Get()
  getRecipes(): Promise<Recipe[]> {
    return this.recipeService.getRecipes();
  }

  @Get(':id')
  getRecipe(@Param('id') recipeId: ObjectId) {
    return this.recipeService.getRecipeById(recipeId);
  }
}
