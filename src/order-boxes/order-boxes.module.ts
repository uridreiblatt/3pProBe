import { Module } from '@nestjs/common';
import { OrderBoxesService } from './order-boxes.service';
import { OrderBoxesController } from './order-boxes.controller';
import { OrderBoxes } from './entities/order-box.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderBoxes])],
  controllers: [OrderBoxesController],
  providers: [OrderBoxesService],
  exports: [OrderBoxesService],
})
export class OrderBoxesModule {}
