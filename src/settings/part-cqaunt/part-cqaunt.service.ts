import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartCqaunt } from './entities/part-cqaunt.entity';
import { UpdatePartCqauntDto } from './dto/update-part-cqaunt.dto';
import { CreatePartCqauntDto } from './dto/create-part-cqaunt.dto';
import { Company } from 'src/usersCompanies/company/entities/company.entity';

@Injectable()
export class PartCqauntService {
  constructor(
    @InjectRepository(PartCqaunt)
    private PartCQuantRepository: Repository<PartCqaunt>,
  ) {}
  async findAll(companyId: number) {
    return await this.PartCQuantRepository.find({
      where: {company: {id:companyId}},
      relations:{ company: true,        
      },
  });
  }
  async findOne(id: number) {
    return await this.PartCQuantRepository.findOne(
      {
        where: {
          id: id
        },
        relations:{ company: true,        
      },
      }
    );
  }

  async update(id: number, updatePartCqauntDto: UpdatePartCqauntDto) {
    const ins =  new PartCqaunt();
    ins.partName = updatePartCqauntDto.partName;
    ins.company =  new Company();
    ins.company.id = updatePartCqauntDto.companyId;
    return await this.PartCQuantRepository.update(id,ins);
  }

  async create (createPartCqauntDto: CreatePartCqauntDto) {
    const ins =  new PartCqaunt();
    ins.partName = createPartCqauntDto.partName;
    ins.company =  new Company();
    ins.company.id = createPartCqauntDto.companyId;
    return await this.PartCQuantRepository.save(ins);
  }
  async remove(id: number) {
    return await this.PartCQuantRepository.delete(id);
  }
}
