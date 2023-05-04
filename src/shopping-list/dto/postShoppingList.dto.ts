import { IsArray, IsOptional, IsString } from 'class-validator';

export class PostShoppingListDto {
  @IsString()
  ownerId: string;

  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sharedWith: string[];
}
