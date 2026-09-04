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
    const res = await this.userComapnyRepository.find({
      where: {
        company: { id: companyId },
      },

      relations: {
        users: true,
        company: true,
      },

      select: {
        users: {
          //id: true,
          isActive: true,
          userName: true,
          userSurname: true,
          userMail: true,
          userMobile: true,
          color: true,
          selectedCompany: true,
          // userUuid NOT selected
          // createdAt NOT selected
        },

        company: {
          //id: true,
          isActive: true,
          name: true,
          description: true,
          // Ssn NOT selected
          // createdAt NOT selected
        },
      },
    });

    return res;
  }
  async findAllUsersByCompany(companyId: string) {
    const res = await this.userComapnyRepository.find({
      where: {
        company: { id: companyId },
      },

      relations: {
        users: true,
      },

      select: {
        users: {
          id: true,
          userName: true,
        },
      },
    });

    return res.map((userCompany) => ({
      userId: userCompany.users.id,
      userName: userCompany.users.userName,
    }));
    return res;
  }
}
