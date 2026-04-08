import { IsNotEmpty, IsString, IsOptional, IsInt, MaxLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateCategoryDto {
    @IsOptional()
    @IsString()
    @MaxLength(20)
    emoji?: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    code: string;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    departmentId?: number;

    @IsOptional()
    @IsString()
    description?: string;
}