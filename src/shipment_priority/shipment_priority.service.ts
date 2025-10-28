import { Injectable } from '@nestjs/common';
import { ShipmentPriority } from './entities/shipment_priority.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShipmentPriorityService {
  constructor(
    @InjectRepository(ShipmentPriority)
    private shipmentPriorityRepository: Repository<ShipmentPriority>,
  ) {}
  async findAll() {
    return await this.shipmentPriorityRepository.find();
  }

  async findOne(id: string) {
    return await this.shipmentPriorityRepository.findOne({
      where: {
        ShipmentCode: id,
      },
    });
  }
}
