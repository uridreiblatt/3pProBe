import { Injectable } from '@nestjs/common';
import { CreateAllRmaDto } from './dto/create-all-rma.dto';
import { UpdateAllRmaDto } from './dto/update-all-rma.dto';
import { AllRma } from './entities/all-rma.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskStatus } from 'src/settings/task-status/entities/task-status.entity';
import { Company } from 'src/usersCompanies/company/entities/company.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';

@Injectable()
export class AllRmaService {

    constructor(
      @InjectRepository(AllRma)
      private allRmaRepository: Repository<AllRma>,
    ) {      
    }
  async create(createAllRmaDto: any) {
        let allRma = new  AllRma();
        allRma = createAllRmaDto;
        // allRma.user =  new User();
        // allRma.user.id = createAllRmaDto.userId;        
        allRma.taskStatus =  new TaskStatus();
        allRma.taskStatus.id = createAllRmaDto.taskStatusId;
        allRma.company = new Company();
        allRma.company.id = createAllRmaDto.companyId;
    return await this.allRmaRepository.save(allRma);
  }

  async findAll(companyId: string) {
    return await this.allRmaRepository.find({
      where: {company:{id: companyId}}
    })
  }

  async findOne(id: string) {
    return await this.allRmaRepository.findOne({
      where: {id: id}
    })
  }

  async update(id: number, updateAllRmaDto: UpdateAllRmaDto) {
    return await this.allRmaRepository.update(id, updateAllRmaDto);
  }

  async remove(id: string) {
    return await this.allRmaRepository.delete(id);
  }
}
