import { Module } from '@nestjs/common';
import { TaskGrvService } from './task-grv.service';
import { TaskGrvController } from './task-grv.controller';

@Module({
  controllers: [TaskGrvController],
  providers: [TaskGrvService],
})
export class TaskGrvModule {}
