import { Injectable, Dependencies } from "@nestjs/common";
import { InjectRepository, getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { randomUUID } from "crypto";
import { UserCompany } from "../user-company/entities/user-company.entity";
import { Company } from "../company/entities/company.entity";

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,
    @InjectRepository(UserCompany) 
    private userCompanyRepository: Repository<UserCompany>,   
  ) {}
  async create(createUserDto: CreateUserDto) {    
    const ins = new User();
    ins.userName = createUserDto.userName;
    ins.userUuid = randomUUID();
    ins.userMail = createUserDto.usermail;
    ins.userMobile = createUserDto.userMobile;    
    ins.userPasswordEnc = createUserDto.userPasswordEnc;  
    ins.isActive = createUserDto.isActive;  
    ins.selectedCompany = createUserDto.companyId;
    const res  =  await this.userRepository.save(ins);

    const insUserCompant = new UserCompany();
    insUserCompant.company =  new Company();
    insUserCompant.company.id = createUserDto.companyId;
    insUserCompant.users = new User();
    insUserCompant.users.id = res.id;
  
    const resUserCompany  =  await this.userCompanyRepository.save(insUserCompant);
    return res;
  }

  async findAll(companyId: string): Promise<any> {      
    const resUser  =  await this.userRepository.find({
      where: {
        userCompany: {company: {id: companyId}},        
      },
      relations: {
        usersRoles: {role: true},
        userCompany: {company: true},

      },
      //select: ["id", "userName", "userMail", "usersRoles",  "userMobile", "isActive"],
    });
    const res  =  resUser.map((user) => {
    

    return {
      id: user.id,
      userName: user.userName,
      userMail: user.userMail,
      userMobile: user.userMobile,            
      roles: user.usersRoles.map((role)=>{
        return        role.role.role}),
        companies: user.userCompany.map((comapny)=>{
        return comapny.company.name}),
      isActive: user.isActive ? 'Active': 'InActive',
    };
  });
  return res;

  }
  

  findAllWithDbProc() {
    return this.userRepository.query("ggg @param1=1 ");
  }
  async signIn(createAuthDto: CreateAuthDto): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        userMail: createAuthDto.email,
        userPasswordEnc: createAuthDto.password,
      },
      relations: {
        usersRoles: {
          role: true,
        },
        userCompany: {company: true},
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
        userCompany: {company: true},
      },
    });
  }

  async findOne(id: string) {
    const resUser =  await this.userRepository.findOne({
      where: { id: id },
      relations:{
        usersRoles: {role: true},
        userCompany:{company: true},
      },
    });
    const resLogin = {
      id: resUser.id,
      userName: resUser.userName,
      userLastName: resUser.userSurname,
      usermail: resUser.userMail,
      userPasswordEnc: resUser.userPasswordEnc,
      selectedCompany: resUser.selectedCompany,
      userRoles: resUser.usersRoles.map((o) => {
        return { id: o.role.id, role: o.role.role };
      }),
      userCompanies: resUser.userCompany.map((o) => {
        return { id: o.company.id, companyName: o.company.name };
      }),
    };
    return  resLogin;
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const ins = new User();
    ins.userName = updateUserDto.userName;
    ins.userMail = updateUserDto.usermail;
    ins.userMobile = updateUserDto.userMobile;
    ins.userPasswordEnc = updateUserDto.userPasswordEnc;
    ins.isActive = updateUserDto.isActive;
    ins.selectedCompany = updateUserDto.selectedCompany;
    return await this.userRepository.update(id, ins);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
