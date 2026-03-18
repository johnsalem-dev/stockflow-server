import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/update-category.dto.';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiOkResponse({ description: 'Returns all categories' })
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiOkResponse({ description: 'Returns the created category' })
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Update an existing category'})
    @ApiOkResponse({ description: 'Returns updated category' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        return this.categoriesService.update(id, updateCategoryDto)
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @ApiOkResponse({ description: 'Returns the deleted category' })
    remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
        return this.categoriesService.remove(id);
    }
}
