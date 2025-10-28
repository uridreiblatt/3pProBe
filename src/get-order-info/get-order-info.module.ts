import { Module } from '@nestjs/common';
import { GetOrderInfoService } from './get-order-info.service';
import { GetOrderInfoController } from './get-order-info.controller';
import { HttpModule } from '@nestjs/axios';
import { OrderLinesModule } from 'src/order-lines/order-lines.module';
import { OrderModule } from 'src/order/order.module';
import { ShipmentPriorityModule } from 'src/shipment_priority/shipment_priority.module';
import { DbLogModule } from 'src/db-log/db-log.module';
import { ShipRushModule } from 'src/ship-rush/ship-rush.module';
import { PartCqauntModule } from 'src/part-cqaunt/part-cqaunt.module';

@Module({
  imports: [
    HttpModule,
    OrderModule,
    OrderLinesModule,
    ShipmentPriorityModule,
    DbLogModule,
    ShipRushModule,
    PartCqauntModule,
  ],
  controllers: [GetOrderInfoController],
  providers: [GetOrderInfoService],
})
export class GetOrderInfoModule {}
