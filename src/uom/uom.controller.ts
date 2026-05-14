import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UomService } from './uom.service';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUomDto } from './dto/create-uom.dto';

@ApiTags('UOM')
@Controller('uom')
export class UomController {
    constructor(private readonly uomService: UomService) {}

    @Get('search')
    @ApiOperation({ summary: 'Lightweight search for dropdowns' })
    @ApiOkResponse({ description: 'Returns up to 20 minimal UOM records' })
    searchDropdown(@Query('q') q?: string) {
      return this.uomService.searchDropdown(q);
    }
  
    @Get()
    @ApiOperation({ summary: 'Get paginated UOM for tables' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
      @Query('search') search?: string,
    ) {
      return this.uomService.findAll(page, limit, search);
    }

  @Post()
  @ApiOperation({ summary: 'Create a new UOM on the fly' })
  create(@Body() createUomDto: CreateUomDto) {
    return this.uomService.create(createUomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a UOM' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.uomService.remove(id);
  }
}
