import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUomDto {
  @ApiProperty({ example: 'Kilograms' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @Transform(({ value }) => value?.trim()) // Prevents hidden duplicate spaces
  name: string;
}