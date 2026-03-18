import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma';
import { getLoggerConfig } from './logger';
import { CategoriesModule } from './categories/categories.module';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ItemsModule } from './items/items.module';
import { PurchasesModule } from './purchases/purchases.module';
import { IssuancesModule } from './issuances/issuances.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getLoggerConfig,
    }),
    PrismaModule,
    CategoriesModule,
    DepartmentsModule,
    EmployeesModule,
    SuppliersModule,
    ItemsModule,
    PurchasesModule,
    IssuancesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
