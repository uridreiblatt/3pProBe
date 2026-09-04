import { Module } from '@nestjs/common';
import { TaskGrvService } from './task-grv.service';
import { TaskGrvController } from './task-grv.controller';
import { TaskGrv } from './entities/task-grv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllGrv } from '../all-grv/entities/all-grv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskGrv, AllGrv])],
  controllers: [TaskGrvController],
  providers: [TaskGrvService],
})
export class TaskGrvModule {}
