import { Module } from '@nestjs/common';
import { ShipRushService } from './ship-rush.service';
import { ShipRushController } from './ship-rush.controller';
import { OrderModule } from 'src/orders/order/order.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipRush } from './entities/ship-rush.entity';

@Module({
  imports: [OrderModule, HttpModule, TypeOrmModule.forFeature([ShipRush])],
  controllers: [ShipRushController],
  providers: [ShipRushService],
  exports: [ShipRushService],
})
export class ShipRushModule {}
