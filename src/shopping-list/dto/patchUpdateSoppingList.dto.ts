import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class PatchUpdateSoppingListDto {
  @IsBoolean()
  @IsOptional()
  isBought: boolean;

  @IsNumber()
  @Min(1)
  @IsOptional()
  amount: number;
}
