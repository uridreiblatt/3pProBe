import { Module } from '@nestjs/common';
import { PriorityProductsHierarchyService } from './priority-products-hierarchy.service';
import { PriorityProductsHierarchyController } from './priority-products-hierarchy.controller';
import { PriorityProductsHierarchy } from './entities/priority-products-hierarchy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PriorityProductsHierarchy])],
  controllers: [PriorityProductsHierarchyController],
  providers: [PriorityProductsHierarchyService],
})
export class PriorityProductsHierarchyModule {}
