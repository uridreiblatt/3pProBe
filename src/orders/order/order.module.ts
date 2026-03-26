import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderLinesModule } from 'src/orders/order-lines/order-lines.module';
import { OrderBasketModule } from 'src/orders/order-basket/order-basket.module';
import { OrderBoxesModule } from 'src/orders/order-boxes/order-boxes.module';
import { TaskUserModule } from 'src/Tasks/task-user/task-user.module';
import { CompanyModule } from 'src/usersCompanies/company/company.module';
import { OrderBoxesItems } from '../order-box-items/entities/order-box-item.entity';
import { OrderBoxItemsModule } from '../order-box-items/order-box-items.module';
import { PartCqaunt } from 'src/settings/part-cqaunt/entities/part-cqaunt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderBoxesItems, PartCqaunt]),
    forwardRef(() => OrderLinesModule),
    OrderBoxesModule,
    OrderBasketModule,
    CompanyModule,
    OrderBoxItemsModule,
    forwardRef(() => TaskUserModule),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule { }
