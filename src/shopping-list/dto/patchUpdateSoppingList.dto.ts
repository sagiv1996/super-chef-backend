import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class PatchUpdateSoppingListDto {
  @IsBoolean()
  @IsOptional()
  isBought: boolean;

  @IsNumber()
  @IsOptional()
  amount: number;
}
