import { Module } from '@nestjs/common';
import { priorityProductsService } from './priorityProducts.service';
import { PriorityProductsController } from './priorityProducts.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PriorityProducts } from './entities/priorityProducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriorityProducts])],
  controllers: [PriorityProductsController],
  providers: [priorityProductsService],
})
export class PartsModule {}
