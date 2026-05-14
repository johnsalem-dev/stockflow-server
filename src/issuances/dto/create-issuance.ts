import { IsArray, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RefSource } from '@prisma/client';

class IssuanceItemDto {
  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @Min(0.01)
  @IsNotEmpty()
  quantity: number;
}

export class CreateIssuanceDto {
  @IsInt()
  @IsNotEmpty()
  employeeId: number;

  @IsEnum(RefSource)
  sourceType: RefSource;

  @IsString()
  @IsNotEmpty()
  referenceNo: string;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IssuanceItemDto)
  items: IssuanceItemDto[];
}