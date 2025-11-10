import { Module } from '@nestjs/common';
import { GetOrderInfoService } from './get-order-info.service';
import { GetOrderInfoController } from './get-order-info.controller';
import { HttpModule } from '@nestjs/axios';
import { OrderLinesModule } from 'src/orders/order-lines/order-lines.module';
import { OrderModule } from 'src/orders/order/order.module';
import { ShipmentPriorityModule } from 'src/maintenence/shipment_priority/shipment_priority.module';
import { DbLogModule } from 'src/db-log/db-log.module';
import { ShipRushModule } from 'src/shipments/ship-rush/ship-rush.module';
import { PartCqauntModule } from 'src/settings/part-cqaunt/part-cqaunt.module';

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
