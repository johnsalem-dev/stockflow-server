import { Transform } from "class-transformer"
import { IsBoolean, IsOptional, IsString } from "class-validator"

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
}