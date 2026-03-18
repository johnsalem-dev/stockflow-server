import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsOptional()
  @IsInt()
  departmentId?: number | null;
  
}