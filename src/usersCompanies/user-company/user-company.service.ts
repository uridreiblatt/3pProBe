import { Injectable } from '@nestjs/common';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { UpdateUserCompanyDto } from './dto/update-user-company.dto';
import { UserCompany } from './entities/user-company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserCompanyService {
  constructor(
    @InjectRepository(UserCompany)
    private userComapnyRepository: Repository<UserCompany>,
  ) {}

  async findAll(companyId: string) {
    return await this.userComapnyRepository.find({
      where: {
        company: { id: companyId },
      },

      relations: {
        users: true,
        company: true,
      },
      //select: ['id', 'userName', 'usermail', 'usersRoles', 'color'],
    });
  }
  async findAllUsersByCompany(companyId: string) {
    const res = await this.userComapnyRepository.find({
      where: {
        company: { id: companyId },
      },

      relations: {
        users: true,
        company: true,
      },
      //select: ['id', 'userName', 'usermail', 'usersRoles', 'color'],
    });
    const resAll = res.map((userCompany) => {
      return {
        userId: userCompany.users.id,
        userName: userCompany.users.userName,
      };
    });
    return resAll;
  }
}
