import { IsBoolean, IsOptional } from 'class-validator';

export class PatchUpdateSoppingListDto {
  @IsBoolean()
  @IsOptional()
  isBought: boolean;

  @IsBoolean()
  @IsOptional()
  amount: boolean;
}
