import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/orders/order/order.module';
import { HttpModule } from '@nestjs/axios';
import { DbLogModule } from 'src/db-log/db-log.module';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from 'src/usersCompanies/company/company.module';
import { AllInventoryCount } from './entities/all-inventory.entity';
import { AllInventoryController } from './all-inventory.controller';
import { AllInventoryService } from './all-inventory.service';
import { TaskInventoryCount } from '../task-inventory-count/entities/task-inventory-count.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AllInventoryCount, TaskInventoryCount]),
    forwardRef(() => OrderModule),
    DbLogModule,
    CompanyModule,
    HttpModule,
    ConfigModule,
  ],
  controllers: [AllInventoryController],
  providers: [AllInventoryService],
})
export class AllInventoryModule {}
