import { Injectable, Dependencies, NotFoundException } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { randomUUID } from 'crypto';
import { UserCompany } from '../user-company/entities/user-company.entity';
import { Company } from '../company/entities/company.entity';
import { UsersRoles } from '../user-role/entities/user-role.entity';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // @InjectRepository(UsersRoles)
    // private userRolesRepository: Repository<UsersRoles>,
  }
  async create(createUserDto: CreateUserDto, companyId: string) {
    const ins = new User();
    ins.userName = createUserDto.userName;
    ins.userUuid = randomUUID();
    ins.userMail = createUserDto.userMail;
    ins.userMobile = createUserDto.userMobile;
    ins.userPasswordEnc = createUserDto.userPasswordEnc;
    ins.isActive = createUserDto.isActive;
    ins.userSurname = createUserDto.userSurname || 'not required';
    ins.selectedCompany = companyId;

    return this.userRepository.manager.transaction(async (manager) => {
      const savedUser = await manager.save(ins);

      const userCompany = new UserCompany();
      userCompany.company = new Company();
      userCompany.company.id = companyId;
      userCompany.users = savedUser;
      await manager.save(userCompany);

      const { userPasswordEnc: _password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword;
    });
  }

  async findAll(companyId: string): Promise<any> {
    const resUser = await this.userRepository.find({
      where: [
        {
          userCompany: { company: { id: companyId } },
        },
      ],
      relations: {
        usersRoles: { role: true },
        userCompany: { company: true },
      },
      order: {
        userName: 'ASC', // or 'DESC'
      },
      //select: ["id", "userName", "userMail", "usersRoles",  "userMobile", "isActive"],
    });
    const res = resUser.map((user) => {
      return {
        id: user.id,
        userName: user.userName,
        userMail: user.userMail,
        userMobile: user.userMobile,
        roles: user.usersRoles
          .sort((a, b) => b.role.id - a.role.id)
          .map((role) => {
            return role.role.role;
          }),
        companies: user.userCompany.map((comapny) => {
          return comapny.company.name;
        }),
        isActive: user.isActive,
      };
    });
    return res;
  }

  async signIn(createAuthDto: CreateAuthDto): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        userMail: createAuthDto.email,
        userPasswordEnc: createAuthDto.password,
        isActive: true,
      },
      relations: {
        usersRoles: {
          role: true,
        },
        userCompany: { company: { companySetting: true } },
      },
    });
  }
  async switchCompany(userUuid: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        userUuid: userUuid,
      },
      relations: {
        usersRoles: {
          role: true,
        },
        userCompany: { company: true },
      },
    });
  }

  async findOne(id: string, companyId: string) {
    const resUser = await this.userRepository.findOne({
      where: {
        id: id,
        userCompany: {
          company: { id: companyId },
        },
      },
      relations: {
        usersRoles: { role: true },
        userCompany: { company: true },
      },
    });
    if (!resUser) {
      throw new NotFoundException('User not found in this company');
    }
    const resLogin = {
      id: resUser.id,
      userName: resUser.userName,
      userLastName: resUser.userSurname,
      userMail: resUser.userMail,
      //userPasswordEnc: resUser.userPasswordEnc,
      selectedCompany: resUser.selectedCompany,
      isActive: resUser.isActive,
      userRoles: resUser.usersRoles.map((o) => {
        return { id: o.role.id, role: o.role.role };
      }),
      userCompanies: resUser.userCompany.map((o) => {
        return { id: o.company.id, companyName: o.company.name };
      }),
    };
    return resLogin;
  }
  async update(id: string, updateUserDto: UpdateUserDto, companyId: string) {
    const payload = {
      userName: updateUserDto.userName,
      userSurname: updateUserDto.userSurname,
      userMail: updateUserDto.userMail,
      userMobile: updateUserDto.userMobile,
      isActive: updateUserDto.isActive,
      ...(updateUserDto.userPasswordEnc
        ? { userPasswordEnc: updateUserDto.userPasswordEnc }
        : {}),
    };
    if (updateUserDto.userPasswordEnc === '') {
      delete payload.userPasswordEnc;
    }

    const user = await this.userRepository.findOne({
      where: {
        id,
        userCompany: {
          company: {
            id: companyId,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found in this company');
    }

    return this.userRepository.update(id, payload);
  }

  async remove(id: string, companyId: string) {
    //return await this.userRepository.delete(id);
    const user = await this.userRepository.findOne({
      where: {
        id,
        userCompany: {
          company: {
            id: companyId,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found in this company');
    }
    const payload = {
      isActive: false,
    };
    return this.userRepository.update(id, payload);
  }
}
