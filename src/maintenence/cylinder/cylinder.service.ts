import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cylinder } from './entities/cylinder.entity';
import { Repository } from 'typeorm';
import { UpdateCylinderDto } from './dto/update-cylinder.dto';
import { CreateCylinderDto } from './dto/create-cylinder.dto';
import { Company } from 'src/usersCompanies/company/entities/company.entity';

@Injectable()
export class CylinderService {
  constructor(
    @InjectRepository(Cylinder)
    private cylinderRepository: Repository<Cylinder>,
  ) {}

  async findAll(companyId: string) {
    const res = await this.cylinderRepository.find({
      where: {
        company: { id: companyId },
      },
      //relations: {company:true},
    });
    const resAll = res.map((cylinder) => {
      return {
        id: cylinder.id,
        partName: cylinder.partName,
        description: cylinder.description,
      };
    });
    return resAll;
  }

  async findOne(id: string, companyId: string) {
    return await this.cylinderRepository.findOne({
      where: {
        id: id,
        company: { id: companyId },
      },
      //relations: {company:true},
    });
  }

  async update(
    id: string,
    updateCylinderDto: UpdateCylinderDto,
    companyId: string,
  ) {
    const ins = new Cylinder();
    ins.description = updateCylinderDto.description;
    ins.partName = updateCylinderDto.partName;
    ins.company = new Company();
    ins.company.id = companyId;
    return this.cylinderRepository.update(id, ins);
  }
  async create(createCylinderDto: CreateCylinderDto, companyId: string) {
    const ins = new Cylinder();
    ins.description = createCylinderDto.description;
    ins.partName = createCylinderDto.partName;
    ins.company = new Company();
    ins.company.id = companyId;
    return this.cylinderRepository.save(ins);
  }

  async remove(id: string, companyId: string) {
    return await this.cylinderRepository.delete({
      id,
      company: { id: companyId },
    });
  }
}
