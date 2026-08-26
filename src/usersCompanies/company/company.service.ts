import { Injectable, Inject } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find({});
  }

  async findOne(id: string) {
    const res = await this.companyRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        companySetting: true,
      },
    });

    //res.companySetting.priorityApiPassword = '********';

    return res;
  }

  async remove(id: string) {
    return this.companyRepository.delete(id);
  }
}
