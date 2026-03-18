import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { GetItemsFilterDto } from './dto/get-items-filter.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Item } from '@prisma/client';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Get()
    @ApiOperation({ summary: 'List all items with stock levels' })
    @ApiOkResponse({ description: 'Returns items from inventory summary (supports ?category=, ?lowStock=, ?search=)' })
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAll(@Query() filter: GetItemsFilterDto) {
        return this.itemsService.findAll(filter);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new inventory item' })
    @ApiOkResponse({ description: 'Returns the created item' })
    create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemsService.create(createItemDto);
    }

    @Patch(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Update item description or UOM' })
    @ApiOkResponse({ description: 'Returns the updated item' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
        return this.itemsService.update(id, updateItemDto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Delete an item' })
    @ApiOkResponse({ description: 'Returns the deleted item' })
    delete(@Param('id', ParseIntPipe) id: number): Promise<Item> {
        return this.itemsService.delete(id);
    }
}
