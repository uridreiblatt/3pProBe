import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cylinder } from './entities/cylinder.entity';
import { Repository } from 'typeorm';
import { UpdateCylinderDto } from './dto/update-cylinder.dto';
import { CreateCylinderDto } from './dto/create-cylinder.dto';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class CylinderService {
  constructor(
    @InjectRepository(Cylinder)
    private cylinderRepository: Repository<Cylinder>,
  ) {}

  async findAll(companyId: number) {
    return await this.cylinderRepository.find({
      where: {
        company: {id:companyId},
      },
      relations: {company:true},

    });
  }

  async findOne(id: number) {
    return await this.cylinderRepository.findOne({
      where: {
        id: id,
      },
      relations: {company:true},

    });
  }

  async update(id: number, updateCylinderDto: UpdateCylinderDto) {
    const ins =  new Cylinder();
    ins.description = updateCylinderDto.description;
    ins.partName = updateCylinderDto.partName;
    ins.company =  new Company();
    ins.company.id = updateCylinderDto.companyId;
    return this.cylinderRepository.update(id, ins);
  }
  async create( createCylinderDto: CreateCylinderDto) {
    const ins =  new Cylinder();
    ins.description = createCylinderDto.description;
    ins.partName = createCylinderDto.partName;
    ins.company =  new Company();
    ins.company.id = createCylinderDto.companyId;
    return this.cylinderRepository.save( ins);
  }

  async remove(id: number) {
    return await this.cylinderRepository.delete(id);
  }
}
