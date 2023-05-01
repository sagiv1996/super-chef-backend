import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PostRecipeDto } from './dto/postRecipe.dto';
import { Recipe } from 'schemas/recipe.schema';
import { RecipeService } from './recipe.service';
import { ObjectId } from 'mongoose';
import { GetRecipeByIngredientsDto } from './dto/getRecipeByIngredients.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Post()
  createRecipe(@Body() body: PostRecipeDto): Promise<Recipe> {
    return this.recipeService.createRecipe(body);
  }

  // TODO: I think its better to add limit to this request, I add a limit as a constant (50) in the service
  @Get()
  getRecipes(): Promise<Recipe[]> {
    return this.recipeService.getRecipes();
  }

  @Get(':id')
  getRecipe(@Param('id') recipeId: ObjectId): Promise<Recipe> {
    return this.recipeService.getRecipeById(recipeId);
  }

  @Get('/:ingredients')
  getRecipeByIngredients(
    @Body() getRecipeByIngredientsDto: GetRecipeByIngredientsDto,
  ): Promise<ObjectId[]> {
    return this.recipeService.getRecipeByIngredients(getRecipeByIngredientsDto);
  }
}
