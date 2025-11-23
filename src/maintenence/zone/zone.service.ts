import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import update from '@elastic/elasticsearch/lib/api/api/update';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZoneService {

  constructor(
      @InjectRepository(Zone)
      private zoneRepository: Repository<Zone>,
    ) {}
    
  async create(createZoneDto: CreateZoneDto) {
      const ins = new  Zone();
      ins.zoneName = createZoneDto.zoneName;
      ins.color = createZoneDto.color;
      ins.priority = createZoneDto.priority;
      //ins.zoneId = createZoneDto.zoneId;
      ins.company = new Company() ;
      ins.company.id =createZoneDto.companyId;
      return await this.zoneRepository.save(ins);
  }

  async findAll(selectCompany: string) {
    return await this.zoneRepository.find({
      where: {company: {id: selectCompany}}
    });
  }

  async findOne(id: string) {
    return await this.zoneRepository.findOne({
      where: {id: id},
      relations: {
        company: true,
      },
    });
  }

  async update(id: number, updateZoneDto: UpdateZoneDto) {
    const ins = new  Zone();
      ins.zoneName = updateZoneDto.zoneName;
      ins.color = updateZoneDto.color;
      ins.priority = updateZoneDto.priority;
      //ins.zoneId = updateZoneDto.zoneId;
      ins.company = new Company() ;
      ins.company.id =updateZoneDto.companyId;
      return await this.zoneRepository.update(id, ins);
  }

  async remove(id: number) {
     return await this.zoneRepository.delete(id);
  }
}
