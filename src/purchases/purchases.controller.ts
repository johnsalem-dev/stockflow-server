import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { GetPurchasesFilterDto } from './dto/get-purchases-filter.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Purchase } from '@prisma/client';
import { UpdatePurchaseStatusDto } from './dto/update-purchase-status.dto';

@Controller('purchases')
@UsePipes(new ValidationPipe({ transform: true }))
export class PurchasesController {
    constructor(private readonly purchasesService: PurchasesService) {}

    @Get()
    @ApiOperation({ summary: 'Audit log of all inward items' })
    @ApiOkResponse({ description: 'Returns purchases (supports ?supplierId=, ?startDate=, ?referenceNo=)' })
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll(@Query() filter: GetPurchasesFilterDto) {
        return this.purchasesService.findAll(filter);
    }

    @Post()
    @ApiOperation({ summary: 'Record a new purchase' })
    @ApiOkResponse({ description: 'Returns the created purchase' })
    create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
        return this.purchasesService.create(createPurchaseDto);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Update an existing purchase' })
    @ApiOkResponse({ description: 'Returns the updated purchase' })
    update(@Param('id', ParseIntPipe) id: number, @Body() updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> | undefined {
        return this.purchasesService.update(id, updatePurchaseDto);
    }

    @Patch(':id/status')
    async updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePurchaseStatusDto
    ) {
        return this.purchasesService.updateStatus(id, dto.status);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Delete a purchase' })
    @ApiOkResponse({ description: 'Returns the deleted purchase' })
    delete(@Param('id', ParseIntPipe) id: number): Promise<Purchase> {
        return this.purchasesService.delete(id);
    }
}
