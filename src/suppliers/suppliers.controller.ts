import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Supplier } from '@prisma/client';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
    constructor(private readonly suppliersService: SuppliersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all suppliers' })
    @ApiOkResponse({ description: 'Returns all suppliers' })
    findAll(): Promise<Supplier[]> {
        return this.suppliersService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new supplier' })
    @ApiOkResponse({ description: 'Returns the created supplier' })
    create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
        return this.suppliersService.create(createSupplierDto);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Update an existing supplier' })
    @ApiOkResponse({ description: 'Returns updated supplier' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
        return this.suppliersService.update(id, updateSupplierDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Delete a supplier' })
    @ApiOkResponse({ description: 'Returns the deleted supplier' })
    delete(@Param('id', ParseIntPipe) id: number): Promise<Supplier> {
        return this.suppliersService.delete(id);
    }
}
