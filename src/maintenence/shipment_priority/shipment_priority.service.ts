import { Injectable } from '@nestjs/common';
import { ShipmentPriority } from './entities/shipment_priority.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShipmentPriorityDto } from './dto/create-shipment_priority.dto';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { UpdateShipmentPriorityDto } from './dto/update-shipment_priority.dto';

@Injectable()
export class ShipmentPriorityService {
  constructor(
    @InjectRepository(ShipmentPriority)
    private shipmentPriorityRepository: Repository<ShipmentPriority>,
  ) {}

  async create(
    createShipmentPriorityDto: CreateShipmentPriorityDto,
    companyId: string,
  ) {
    const ins = new ShipmentPriority();
    ins.ShipmentCode = createShipmentPriorityDto.ShipmentCode;
    ins.ShippingMethod = createShipmentPriorityDto.ShippingMethod;
    ins.priority = createShipmentPriorityDto.priority;
    ins.shipRushAcountNumber = createShipmentPriorityDto.shipRushAcountNumber;
    ins.shipRushCode = createShipmentPriorityDto.shipRushCode;
    //ins.ShippingMethod = createShipmentPriorityDto.usermail;
    const cmp = new Company();
    cmp.id = companyId;
    ins.company = cmp;

    return await this.shipmentPriorityRepository.save(ins);
  }
  async findAll(idCompany: string) {
    return await this.shipmentPriorityRepository.find({
      where: {
        company: { id: idCompany },
      },
      // relations: {
      //   company: true,
      // }
    });
  }

  async findOne(id: string, companyId: string) {
    return await this.shipmentPriorityRepository.findOne({
      where: {
        id: id,
        company: { id: companyId },
      },
      relations: {
        company: true,
      },
    });
  }

  async findOneByStCode(stCode: string, companyId: string) {
    return await this.shipmentPriorityRepository.findOne({
      where: {
        ShipmentCode: stCode,
        company: { id: companyId },
      },
    });
  }

  async update(
    id: string,
    updateShipmentPriorityDto: UpdateShipmentPriorityDto,

    companyId: string,
  ) {
    const ins = new ShipmentPriority();
    ins.ShipmentCode = updateShipmentPriorityDto.ShipmentCode;
    ins.ShippingMethod = updateShipmentPriorityDto.ShippingMethod;
    ins.priority = updateShipmentPriorityDto.priority;
    ins.shipRushAcountNumber = updateShipmentPriorityDto.shipRushAcountNumber;
    ins.shipRushCode = updateShipmentPriorityDto.shipRushCode;
    return await this.shipmentPriorityRepository.update(
      { id, company: { id: companyId } },
      ins,
    );
  }

  async remove(id: string, companyId: string) {
    return await this.shipmentPriorityRepository.delete({
      id,
      company: { id: companyId },
    });
  }
}
