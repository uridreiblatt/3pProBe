import { Module } from '@nestjs/common';
import { PriorityProductsLocationsService } from './priority-products-locations.service';
import { PriorityProductsLocationsController } from './priority-products-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriorityProductsLocation } from './entities/priority-products-location.entity';
import { Zone } from '../zone/entities/zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PriorityProductsLocation, Zone])],
  controllers: [PriorityProductsLocationsController],
  providers: [PriorityProductsLocationsService],
})
export class PriorityProductsLocationsModule {}
