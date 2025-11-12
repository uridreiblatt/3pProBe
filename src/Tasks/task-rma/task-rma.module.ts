import { Module } from '@nestjs/common';
import { TaskRmaService } from './task-rma.service';
import { TaskRmaController } from './task-rma.controller';
import { TaskRma } from './entities/task-rma.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([TaskRma]),    
    ],
  controllers: [TaskRmaController],
  providers: [TaskRmaService],
})
export class TaskRmaModule {}
