import { RefSource } from "@prisma/client";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsArray, ValidateNested } from "class-validator";

// 1. Create a sub-DTO for the line items
export class PurchaseItemDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  itemId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rate?: number;
}

// 2. Update the main DTO
export class CreatePurchaseDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  supplierId: number;

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

  // 3. Validate the incoming array
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto) // Tells class-transformer what type is inside the array
  items: PurchaseItemDto[];
}