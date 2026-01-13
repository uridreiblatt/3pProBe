import { Module } from '@nestjs/common';
import { OrderModule } from 'src/orders/order/order.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliverySetting } from './entities/delivery-setting.entity';
import { DeliverySettingController } from './delivery-setting.controller';
import { DeliverySettingService } from './delivery-setting.service';


@Module({
  imports: [OrderModule, HttpModule, TypeOrmModule.forFeature([DeliverySetting])],
  controllers: [DeliverySettingController],
  providers: [DeliverySettingService],
  exports: [DeliverySettingService],
})
export class DeliverySettingModule {}
