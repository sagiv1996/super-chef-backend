import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class LimitAndSkipDto {
  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  limit: number = 100;

  @Transform(({ value }) => Number.parseInt(value))
  @IsNumber()
  @IsOptional()
  skip: number = 0;
}
