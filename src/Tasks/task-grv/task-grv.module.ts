import { Module } from '@nestjs/common';
import { TaskGrvService } from './task-grv.service';
import { TaskGrvController } from './task-grv.controller';
import { TaskGrv } from './entities/task-grv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([TaskGrv]),    
    ],
  controllers: [TaskGrvController],
  providers: [TaskGrvService],
})
export class TaskGrvModule {}
