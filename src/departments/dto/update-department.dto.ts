import { PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "src/categories/dto/create-category.dto";

export class UpdateDepartmentDto extends  PartialType(CreateCategoryDto) {}