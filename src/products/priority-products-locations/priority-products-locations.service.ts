import { Injectable } from '@nestjs/common';
import { CreatePriorityProductsLocationDto } from './dto/create-priority-products-location.dto';
import { UpdatePriorityProductsLocationDto } from './dto/update-priority-products-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriorityProductsLocation } from './entities/priority-products-location.entity';
import { Zone } from '../../maintenence/zone/entities/zone.entity';

@Injectable()
export class PriorityProductsLocationsService {
  constructor(
    @InjectRepository(PriorityProductsLocation)
    private priorityProductsLocationsRepo: Repository<PriorityProductsLocation>,
    @InjectRepository(Zone)
    private priorityZoneRepo: Repository<Zone>,
  ) {}
  async create(
    createPriorityProductsLocationDto: CreatePriorityProductsLocationDto,
  ) {
    if (createPriorityProductsLocationDto.stockDate?.toString() === '') {
      createPriorityProductsLocationDto.stockDate = null;
    }
    return await this.priorityProductsLocationsRepo.save(
      createPriorityProductsLocationDto,
    );
  }

  async findZones() {
    return await this.priorityZoneRepo.find();
  }

  async findAll() {
    return await this.priorityProductsLocationsRepo.find();
  }

  async findAllByProduct(id: string) {
    return await this.priorityProductsLocationsRepo.find({
      where: {
        priorityProducts: { id: id },
      },
      relations: {
        zone: true,
      },
      order: {
        zone: { priority: 'ASC' },
        stockDate: 'ASC',
      },
    });
  }
  async findAllByProductName(partName: string) {
    return await this.priorityProductsLocationsRepo.find({
      where: {
        priorityProducts: { PARTNAME: partName },
      },
      relations: {
        zone: true,
      },
      order: {
        zone: { priority: 'ASC' },
        stockDate: 'ASC',
      },
    });
  }

  async findOne(id: string) {
    return await this.priorityProductsLocationsRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        zone: true,
      },
    });
  }

  async update(
    id: number,
    updatePriorityProductsLocationDto: UpdatePriorityProductsLocationDto,
  ) {
    if (updatePriorityProductsLocationDto.stockDate?.toString() === '') {
      updatePriorityProductsLocationDto.stockDate = null;
    }

    return await this.priorityProductsLocationsRepo.update(
      id,
      updatePriorityProductsLocationDto,
    );
  }

  async remove(id: number) {
    return await this.priorityProductsLocationsRepo.delete(id);
  }
}
