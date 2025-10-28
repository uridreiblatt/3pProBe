import { Injectable } from '@nestjs/common';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { UpdateUserCompanyDto } from './dto/update-user-company.dto';
import { UserCompany } from './entities/user-company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserCompanyService {
  constructor(
      @InjectRepository(UserCompany) private userComapnyRepository: Repository<UserCompany>,       
    ) {}

  create(createUserCompanyDto: CreateUserCompanyDto) {
    return 'This action adds a new userCompany';
  }

  async findAll() {
    return await this.userComapnyRepository.find(
      {
        where: {
        company: {id :1 }
      },
      
      relations: {
        users: true,       
        company: true,
      },
      //select: ['id', 'userName', 'usermail', 'usersRoles', 'color'],
    }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} userCompany`;
  }

  update(id: number, updateUserCompanyDto: UpdateUserCompanyDto) {
    return `This action updates a #${id} userCompany`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCompany`;
  }
}
