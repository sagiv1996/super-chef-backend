export interface GetRecipesQuery {
  ownerId?: string;
  name?: RegExp;
  tags?: object;
  preparationTime?: object;
  'ingredients.id'?: object;
}
