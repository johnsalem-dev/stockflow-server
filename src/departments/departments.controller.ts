import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Department } from '@prisma/client';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
export class DepartmentsController {
    constructor(private readonly departmentsService: DepartmentsService) {}

    @Get()
    @ApiOperation({ summary: 'Get all departments' })
    @ApiOkResponse({ description: 'Returns all departments' })
    findAll(): Promise<Department[]>{
        return this.departmentsService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new department' })
    @ApiOkResponse({ description: 'Returns the created department' })
    create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department>{
        return this.departmentsService.create(createDepartmentDto);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Update an existing department'})
    @ApiOkResponse({ description: 'Returns updated department' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
        return this.departmentsService.update(id, updateDepartmentDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a department' })
    @ApiOkResponse({ description: 'Returns the deleted department' })
    delete(@Param('id', ParseIntPipe) id: number): Promise<Department> {
        return this.departmentsService.remove(id);
    }
}
