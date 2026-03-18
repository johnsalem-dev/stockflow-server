import { Module } from '@nestjs/common';
import { IssuancesController } from './issuances.controller';
import { IssuancesService } from './issuances.service';

@Module({
  controllers: [IssuancesController],
  providers: [IssuancesService]
})
export class IssuancesModule {}
