import { Transform } from "class-transformer";
import { IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class GetPurchasesFilterDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => (value ? parseInt(value, 10) : undefined))
  supplierId?: number;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsString()
  referenceNo?: string;
}
