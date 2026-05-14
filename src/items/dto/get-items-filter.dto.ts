import { Transform, Type } from "class-transformer"
import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator"

export class GetItemsFilterDto {
    @IsOptional()
    @IsString()
    category?: string

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    lowStock?: boolean

    @IsOptional()
    @IsString()
    search?: string

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit: number = 10;
}