import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { IssuancesService } from './issuances.service';
import { CreateIssuanceDto } from './dto/create-issuance';
import { UpdateIssuanceDto } from './dto/update-issuance';
import { GetIssuancesQueryDto } from './dto/get-issuances';

@Controller('issuances')
@UsePipes(new ValidationPipe({ transform: true }))
export class IssuancesController {
    constructor(private readonly issuanceService: IssuancesService) {}

  @Post()
  async create(@Body() dto: CreateIssuanceDto) {
    return this.issuanceService.create(dto, 'Admin');
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query() query: GetIssuancesQueryDto) {
    return this.issuanceService.findAll(query);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateIssuanceDto: UpdateIssuanceDto
  ) {
    return this.issuanceService.update(id, updateIssuanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.issuanceService.remove(id);
  }
}
