import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongoose';
export class GetRescipesByFiltersDto {
  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsNumber()
  @IsOptional()
  preparationTime?: number;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  ingredientsIds?: ObjectId[];
}
