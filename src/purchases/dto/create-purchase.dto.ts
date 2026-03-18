import { RefSource } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  supplierId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  itemId: number;

  @IsNotEmpty()
  @IsEnum(RefSource)
  sourceType: RefSource;

  @IsNotEmpty()
  @IsString()
  referenceNo: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  purchaseDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rate?: number;
}
