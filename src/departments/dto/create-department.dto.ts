import { IsNotEmpty, IsString, IsOptional, IsInt, MaxLength } from "class-validator";

export class CreateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(10)
    code: string; // Matches "E.G. IT-001"

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    headId?: number; // From the "Select Head of Department" dropdown
}