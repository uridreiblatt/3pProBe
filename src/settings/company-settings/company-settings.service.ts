import { Injectable } from '@nestjs/common';
import { CreateCompanySettingDto } from './dto/create-company-setting.dto';
import { UpdateCompanySettingDto } from './dto/update-company-setting.dto';
import { CompanySetting } from './entities/company-setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from 'src/usersCompanies/company/entities/company.entity';

@Injectable()

export class CompanySettingsService {
  constructor(
      @InjectRepository(CompanySetting)
      private orderRepository: Repository<CompanySetting>,
      
    ) {
     
    }
  async create(createCompanySettingDto: CreateCompanySettingDto) {
    const ins  =  new CompanySetting();
    ins.company =  new Company();
    ins.company.id = '1';

    return await this.orderRepository.save(ins);
  }

  async findAll(companyId: string) {
    return await this.orderRepository.find({
      //where: {company:{id: companyId}}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} companySetting`;
  }

  update(id: number, updateCompanySettingDto: UpdateCompanySettingDto) {
    return `This action updates a #${id} companySetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} companySetting`;
  }
}
