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
    return this.companyRepository.find();
  }

  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

  

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}



