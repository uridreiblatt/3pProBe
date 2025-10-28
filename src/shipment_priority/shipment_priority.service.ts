import { Injectable } from '@nestjs/common';
import { ShipmentPriority } from './entities/shipment_priority.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShipmentPriorityDto } from './dto/create-shipment_priority.dto';
import { Company } from 'src/company/entities/company.entity';
import { UpdateShipmentPriorityDto } from './dto/update-shipment_priority.dto';

@Injectable()
export class ShipmentPriorityService {
  constructor(
    @InjectRepository(ShipmentPriority)
    private shipmentPriorityRepository: Repository<ShipmentPriority>,
  ) {}


  async create(createShipmentPriorityDto: CreateShipmentPriorityDto) {
      const ins = new ShipmentPriority();
      ins.ShipmentCode = createShipmentPriorityDto.ShipmentCode;
      ins.ShippingMethod = createShipmentPriorityDto.ShippingMethod;
      ins.priority = createShipmentPriorityDto.priority;
      ins.shipRushAcountNumber = createShipmentPriorityDto.shipRushAcountNumber;
      ins.shipRushCode = createShipmentPriorityDto.shipRushCode;
      //ins.ShippingMethod = createShipmentPriorityDto.usermail;
      const cmp = new Company();
      cmp.id = createShipmentPriorityDto.companyId;
      ins.company = cmp;


      return await this.shipmentPriorityRepository.save(ins);
    }
  async findAll(idComapny: number) {
    return await this.shipmentPriorityRepository.find({
      where:{
        company :{id: idComapny}
      },
      relations: {
        company: true,
      }
    });
  }

  async findOne(id: string) {
    return await this.shipmentPriorityRepository.findOne({
      where: {
        ShipmentCode: id,
      },
    });
  }

  async update(id: number, updateShipmentPriorityDto: UpdateShipmentPriorityDto) {
      const ins = new ShipmentPriority();
      ins.ShipmentCode = updateShipmentPriorityDto.ShipmentCode;
      ins.ShippingMethod = updateShipmentPriorityDto.ShippingMethod;
      ins.priority = updateShipmentPriorityDto.priority;
      ins.shipRushAcountNumber = updateShipmentPriorityDto.shipRushAcountNumber;
      ins.shipRushCode = updateShipmentPriorityDto.shipRushCode;
      return await this.shipmentPriorityRepository.update(id, ins);
    }
  
    async remove(id: number) {
      return await this.shipmentPriorityRepository.delete(id);
    }
}
