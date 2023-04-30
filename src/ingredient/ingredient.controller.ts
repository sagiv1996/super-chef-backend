import { Controller, Get, Query } from '@nestjs/common';
import { GetIngredientDto } from './dto/getIngredient.dto';
import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}
  @Get()
  getIngredients(@Query() query: GetIngredientDto) {
    return this.ingredientService.getIngredients(query);
  }
}
