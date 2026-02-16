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
      private CompanySettingRepository: Repository<CompanySetting>,
      
    ) {
     
    }
  async create(createCompanySettingDto: CreateCompanySettingDto) {
    const ins  =  new CompanySetting();
    ins.company =  new Company();
    ins.company.id = createCompanySettingDto.companyId;

    return await this.CompanySettingRepository.save(ins);
  }

  async findAll(companyId: string) {
    return await this.CompanySettingRepository.find({
      //where: {company:{id: companyId}}
    });
  }

  async findOne(id: string) {
    return await this.CompanySettingRepository.findOne(
      {
      where: {id: id}
  });
}

  async update(id: string, updateCompanySettingDto: UpdateCompanySettingDto) {  
        const upd = new CompanySetting();
        upd.priorityApiUrl = updateCompanySettingDto.priorityApiUrl;
        upd.priorityApiCompany = updateCompanySettingDto.priorityApiCompany;
        upd.priorityApiUser = updateCompanySettingDto.priorityApiUser;
        upd.priorityApiPassword = updateCompanySettingDto.priorityApiPassword;
        upd.priorityOrderStatus = updateCompanySettingDto.priorityOrderStatus;
        upd.priorityPoStatus = updateCompanySettingDto.priorityPoStatus;
        upd.priorityRmaStatus = updateCompanySettingDto.priorityRmaStatus;        
        upd.priorityProductStatus = updateCompanySettingDto.priorityProductStatus;
        upd.addtionalPickingInfo = updateCompanySettingDto.addtionalPickingInfo;
        upd.qcRequired = updateCompanySettingDto.qcRequired;
        upd.shipmentUrl = updateCompanySettingDto.shipmentUrl;
        upd.shipmentUser = updateCompanySettingDto.shipmentUser;
        upd.shipmentPassword = updateCompanySettingDto.shipmentPassword;
        upd.shipmentCallBack = updateCompanySettingDto.shipmentCallBack;
        upd.boxItemsCount = updateCompanySettingDto.boxItemsCount;
        upd.isActive = updateCompanySettingDto.isActive;        
        return await this.CompanySettingRepository.update(id, upd);
      }


  remove(id: number) {
    return `This action removes a #${id} companySetting`;
  }
}
