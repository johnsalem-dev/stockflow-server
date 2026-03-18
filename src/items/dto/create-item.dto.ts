import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  uom: string;

  @IsOptional()
  @IsInt()
  categoryId?: number | null;
}
