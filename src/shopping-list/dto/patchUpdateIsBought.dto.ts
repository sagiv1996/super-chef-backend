import { IsBoolean } from 'class-validator';

export class PatchUpdateIsBoughtDto {
  @IsBoolean()
  isBought: boolean;
}
