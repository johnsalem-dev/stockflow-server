import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Employee } from '@prisma/client';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Get()
    @ApiOperation({ summary: 'Get all employees' })
    @ApiOkResponse({ description: 'Returns all employees' })
    findAll(): Promise<Employee[]> {
        return this.employeesService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new employee' })
    @ApiOkResponse({ description: 'Returns the created employee' })
    create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
        return this.employeesService.create(createEmployeeDto);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Update an existing employee' })
    @ApiOkResponse({ description: 'Returns updated employee' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
        return this.employeesService.update(id, updateEmployeeDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Delete an employee' })
    @ApiOkResponse({ description: 'Returns the deleted employee' })
    delete(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
        return this.employeesService.delete(id);
    }
}
