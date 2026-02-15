import { Module } from "@nestjs/common";
import { ShipRushService } from "./ship-rush.service";
import { ShipRushController } from "./ship-rush.controller";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModule } from "src/orders/order/order.module";
import { DeliverySetting } from "../delivery-setting/entities/delivery-setting.entity";
import { CompanyModule } from "src/usersCompanies/company/company.module";

@Module({
  imports: [
    OrderModule,
    HttpModule,
    CompanyModule,
    TypeOrmModule.forFeature([DeliverySetting]),
  ],
  controllers: [ShipRushController],
  providers: [ShipRushService],
  exports: [ShipRushService],
})
export class ShipRushModule {}
