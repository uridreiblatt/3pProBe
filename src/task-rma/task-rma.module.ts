import { Module } from '@nestjs/common';
import { TaskRmaService } from './task-rma.service';
import { TaskRmaController } from './task-rma.controller';

@Module({
  controllers: [TaskRmaController],
  providers: [TaskRmaService],
})
export class TaskRmaModule {}
