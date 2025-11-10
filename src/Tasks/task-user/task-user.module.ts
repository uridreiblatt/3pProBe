import { forwardRef, Module } from '@nestjs/common';
import { TaskUserService } from './task-user.service';
import { TaskUserController } from './task-user.controller';
import { TaskUser } from './entities/task-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from 'src/orders/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskUser]),
    forwardRef(() => OrderModule),
  ],
  controllers: [TaskUserController],
  providers: [TaskUserService],
  exports: [TaskUserService],
})
export class TaskUserModule {}
