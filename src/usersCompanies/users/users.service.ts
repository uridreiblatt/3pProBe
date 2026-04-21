import { Injectable, Dependencies } from '@nestjs/common';
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
    @InjectRepository(UserCompany)
    private userCompanyRepository: Repository<UserCompany>,
  ) {
    // @InjectRepository(UsersRoles)
    // private userRolesRepository: Repository<UsersRoles>,
  }
  async create(createUserDto: CreateUserDto) {
    const ins = new User();
    ins.userName = createUserDto.userName;
    ins.userUuid = randomUUID();
    ins.userMail = createUserDto.userMail;
    ins.userMobile = createUserDto.userMobile;
    ins.userPasswordEnc = createUserDto.userPasswordEnc || 'aaa12345';
    ins.isActive = createUserDto.isActive;
    ins.userSurname = createUserDto.userSurname || 'not required';
    ins.selectedCompany = createUserDto.companyId;
    const res = await this.userRepository.save(ins);

    const insUserCompant = new UserCompany();
    insUserCompant.company = new Company();
    insUserCompant.company.id = createUserDto.companyId;
    insUserCompant.users = new User();
    insUserCompant.users.id = res.id;

    const resUserCompany =
      await this.userCompanyRepository.save(insUserCompant);

    return res;
  }

  async findAll(companyId: string): Promise<any> {
    const resUser = await this.userRepository.find({
      where: {
        userCompany: { company: { id: companyId } },
      },
      relations: {
        usersRoles: { role: true },
        userCompany: { company: true },
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

  findAllWithDbProc() {
    return this.userRepository.query('ggg @param1=1 ');
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
        userCompany: { company: true },
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

  async findOne(id: string) {
    const resUser = await this.userRepository.findOne({
      where: { id: id },
      relations: {
        usersRoles: { role: true },
        userCompany: { company: true },
      },
    });
    const resLogin = {
      id: resUser.id,
      userName: resUser.userName,
      userLastName: resUser.userSurname,
      userMail: resUser.userMail,
      userPasswordEnc: resUser.userPasswordEnc,
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
  async update(id: string, updateUserDto: UpdateUserDto) {
    // const ins = new User();
    // ins.userName = updateUserDto.userName;
    // ins.userMail = updateUserDto.userMail;
    // ins.userMobile = updateUserDto.userMobile;
    // ins.userPasswordEnc = updateUserDto.userPasswordEnc;
    // ins.isActive = updateUserDto.isActive;
    // ins.selectedCompany = updateUserDto.selectedCompany;
    const payload = {
      ...updateUserDto,
      ...(updateUserDto.userPasswordEnc
        ? { userPasswordEnc: updateUserDto.userPasswordEnc }
        : {}),
    };
    delete payload.companyId;
    if (updateUserDto.userPasswordEnc === '') {
      delete payload.userPasswordEnc;
    }
    console.log('payload', payload);

    return await this.userRepository.update(id, payload);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
