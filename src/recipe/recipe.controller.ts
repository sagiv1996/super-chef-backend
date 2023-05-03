import { Body, Controller, Get, Post, Param, Query } from '@nestjs/common';
import { PostRecipeDto } from './dto/postRecipe.dto';
import { Recipe } from 'schemas/recipe.schema';
import { RecipeService } from './recipe.service';
import { ObjectId } from 'mongoose';
import { RecipeTimePreparationDto } from './dto/recipeTimePreparation.dto';

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

  @Post('preparationTime')
  getRecipeByPreparationTime(
    @Query() preparationTime: RecipeTimePreparationDto,
  ): Promise<Recipe[]> {
    console.log(preparationTime);
    return this.recipeService.getRecipeByPreparationTime(preparationTime);
  }
}
