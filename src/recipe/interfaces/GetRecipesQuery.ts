export interface GetRecipesQuery {
  ownerId?: string;
  name?: RegExp;
  tags?: object;
  preparationTime?: object;
  ingredientsIds?: object;
}
