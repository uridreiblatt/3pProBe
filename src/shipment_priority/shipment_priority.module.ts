import { Module } from '@nestjs/common';
import { ShipmentPriorityService } from './shipment_priority.service';
import { ShipmentPriorityController } from './shipment_priority.controller';
import { ShipmentPriority } from './entities/shipment_priority.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ShipmentPriority])],
  controllers: [ShipmentPriorityController],
  providers: [ShipmentPriorityService],
  exports: [ShipmentPriorityService],
})
export class ShipmentPriorityModule {}
