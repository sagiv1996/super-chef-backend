import { Body, Controller, Get, Query, Post } from '@nestjs/common';
import { GetIngredientDto } from './dto/getIngredient.dto';
import { IngredientService } from './ingredient.service';
import { PostIngredientDto } from './dto/postIngredient.dto';
import { Ingredient } from 'src/schemas/ingredient.schema';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}
  @Get()
  getIngredients(@Query() query: GetIngredientDto): Promise<Ingredient[]> {
    return this.ingredientService.getIngredients(query);
  }

  @Post()
  createIngredient(@Body() body: PostIngredientDto): Promise<Ingredient> {
    return this.ingredientService.createIngredient(body);
  }
}
