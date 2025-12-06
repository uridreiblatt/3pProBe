import { Module } from '@nestjs/common';
import { priorityProductsService } from './priorityProducts.service';
import { PriorityProductsController } from './priorityProducts.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PriorityProducts } from './entities/priorityProducts.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([PriorityProducts]), HttpModule,],
  controllers: [PriorityProductsController],
  providers: [priorityProductsService],
})
export class PartsModule {}
