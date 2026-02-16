import { Injectable } from '@nestjs/common';
import { CreatePriorityProductsLocationDto } from './dto/create-priority-products-location.dto';
import { UpdatePriorityProductsLocationDto } from './dto/update-priority-products-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriorityProductsLocation } from './entities/priority-products-location.entity';
import { Zone } from '../../maintenence/zone/entities/zone.entity';
import { PriorityProducts } from '../priorityProducts/entities/priorityProducts.entity';
import { TaskStatusEnum } from 'src/settings/task-status/entities/task-status.entity';
import { rolesEnum } from 'src/auth/entities/role.enum';

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
    
     const ins =  new PriorityProductsLocation();
    ins.location = createPriorityProductsLocationDto.location;
    ins.quantity = createPriorityProductsLocationDto.quantity;
    ins.stockDate = new Date(createPriorityProductsLocationDto.stockDate);
    ins.priorityProducts = new PriorityProducts();
    ins.priorityProducts.id = createPriorityProductsLocationDto.productId;
    ins.zone =  new Zone();
    ins.zone.id = createPriorityProductsLocationDto.zoneId;
    return await this.priorityProductsLocationsRepo.save(
      ins,
    );
  }

  async findZones() {
    return await this.priorityZoneRepo.find();
  }

  async findAll(companyId: string) {
    const res =  await this.priorityProductsLocationsRepo.find({
       where: {
              priorityProducts: { company: {id: companyId}}
      
            },
            relations: {priorityProducts: true, zone: true,},
            }
    );
    const resAll = res.map((loc)=>{
      return {
      id: loc.id,
      location:  loc.location,
      zone: loc.zone.zoneName,
      product: loc.priorityProducts.PARTNAME,
      }
    });
    return resAll;

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
    const res = await this.priorityProductsLocationsRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        zone: true,
        priorityProducts: true,
      },
    });

    const resAll  =  {
      id: res.id,             
      zone: res.zone.zoneName,
      zoneId: res.zone.id,
      location: res.location,
      product: res.priorityProducts.PARTNAME,
      productId: res.priorityProducts.id,
      quantity: res.quantity,
      stockDate: res.stockDate,
    };
    return resAll;
  }

  

  async update(
    id: string,
    updatePriorityProductsLocationDto: UpdatePriorityProductsLocationDto,
  ) {
    // if (updatePriorityProductsLocationDto.stockDate?.toString() === '') {
    //   updatePriorityProductsLocationDto.stockDate = null;
    // }

    const upt =  new PriorityProductsLocation();
    upt.location = updatePriorityProductsLocationDto.location;
    upt.quantity = updatePriorityProductsLocationDto.quantity;
    upt.stockDate = upt.stockDate = new Date(updatePriorityProductsLocationDto.stockDate);
    upt.priorityProducts = new PriorityProducts();
    upt.priorityProducts.id = updatePriorityProductsLocationDto.productId;
    upt.zone =  new Zone();
    upt.zone.id = updatePriorityProductsLocationDto.zoneId;

    return await this.priorityProductsLocationsRepo.update(
      id,
      upt,
    );
  }

  async remove(id: string) {
    return await this.priorityProductsLocationsRepo.delete(id);
  }
}
