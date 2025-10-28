import { Module } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { TaskTypeController } from './task-type.controller';
import { TaskType } from './entities/task-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaskType])],
  controllers: [TaskTypeController],
  providers: [TaskTypeService],
})
export class TaskTypeModule {}
