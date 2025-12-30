import { forwardRef, Module } from '@nestjs/common';
import { OrderLinesService } from './order-lines.service';
import { OrderLinesController } from './order-lines.controller';
import { OrderLine } from './entities/order-line.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskUserModule } from 'src/Tasks/task-user/task-user.module';
import { TaskUser } from 'src/Tasks/task-user/entities/task-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderLine, TaskUser]),
    forwardRef(() => TaskUserModule),
  ],
  controllers: [OrderLinesController],
  providers: [OrderLinesService],
  exports: [OrderLinesService],
})
export class OrderLinesModule {}
