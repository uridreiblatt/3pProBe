import { Module } from '@nestjs/common';
import { OrderBasketService } from './order-basket.service';
import { OrderBasketController } from './order-basket.controller';
import { OrderBasket } from './entities/order-basket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderBasket])],
  controllers: [OrderBasketController],
  providers: [OrderBasketService],
  exports: [OrderBasketService],
})
export class OrderBasketModule {}
