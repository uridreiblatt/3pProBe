import { Module } from '@nestjs/common';
import { OrderBoxItemsService } from './order-box-items.service';
import { OrderBoxItemsController } from './order-box-items.controller';
import { OrderBoxesItems } from './entities/order-box-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderBoxesItems])],
  controllers: [OrderBoxItemsController],
  providers: [OrderBoxItemsService],
  exports: [OrderBoxItemsService],
})
export class OrderBoxItemsModule {}
