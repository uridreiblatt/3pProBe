import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

  async findOne(companyId: string) {
    const res = await this.companyRepository.findOne({
      where: {
        id: companyId,
      },
      relations: {
        companySetting: true,
      },
    });

    //res.companySetting.priorityApiPassword = '********';

    return res;
  }

  async remove(id: string, companyId: string) {
    const result = await this.companyRepository.update(
      { id: companyId },
      {
        isActive: false,
      },
    );

    if (!result.affected) {
      throw new NotFoundException(`Company not found`);
    }

    return {
      message: 'Company deactivated successfully',
    };
  }
}
