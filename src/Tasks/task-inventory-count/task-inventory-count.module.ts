import { Module } from '@nestjs/common';
import { TaskInventoryCountService } from './task-inventory-count.service';
import { TaskInventoryCountController } from './task-inventory-count.controller';
import { TaskInventoryCount } from './entities/task-inventory-count.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskInventoryCount]),    
  ],
  controllers: [TaskInventoryCountController],
  providers: [TaskInventoryCountService],
})
export class TaskInventoryCountModule {}
