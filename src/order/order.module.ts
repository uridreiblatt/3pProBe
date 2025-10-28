import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLinesModule } from 'src/order-lines/order-lines.module';
import { OrderBasketModule } from 'src/order-basket/order-basket.module';
import { OrderBoxesModule } from 'src/order-boxes/order-boxes.module';
import { TaskUserModule } from 'src/task-user/task-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => OrderLinesModule),
    OrderBoxesModule,
    OrderBasketModule,
    forwardRef(() => TaskUserModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
