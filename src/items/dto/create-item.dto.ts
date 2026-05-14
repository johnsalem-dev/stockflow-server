import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateItemDto {
  @ApiProperty({ 
    example: 'OS-PAP-A4-001', 
    description: 'Unique SKU or Item Code' 
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  sku: string;

  @ApiProperty({ 
    example: 'Premium A4 Copy Paper', 
    description: 'Short name of the item' 
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ 
    example: '80gsm high-quality laser print paper', 
    description: 'Detailed specifications or notes' 
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    example: 'Reams', 
    description: 'Unit of Measure' 
  })
  @ApiProperty({ example: 1, description: 'The ID of the Unit of Measure' })
  @IsInt()
  @Min(1)
  uomId: number;

  @ApiProperty({ 
    example: 20, 
    description: 'Minimum stock level before triggerring a "Low Stock" alert' 
  })
  @IsInt()
  @Min(0)
  minThreshold: number;

  @ApiPropertyOptional({ 
    example: 1, 
    description: 'The Database ID of the Category' 
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId?: number;
}