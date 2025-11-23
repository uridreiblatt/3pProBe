import { Injectable, Dependencies } from "@nestjs/common";
import { InjectRepository, getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { randomUUID } from "crypto";

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,   
  ) {}
  async create(createUserDto: CreateUserDto) {
    const ins = new User();
    ins.userName = createUserDto.userName;
    ins.userSurname = 'na';
    ins.userUuid = randomUUID();
    ins.usermail = createUserDto.usermail;
    ins.userMobile = createUserDto.userMobile;
    ins.color = 'red';
    ins.userPasswordEnc = createUserDto.userPasswordEnc;
    ins.otp = '123';
    ins.id= '10';   
    return await this.userRepository.save(ins);
  }

  async findAll(companyId: string): Promise<any> {
    console.log('companyId',companyId)
    return await this.userRepository.find({
      where: {
        userCompany: {company: {id: companyId}},        
      },
      relations: {
        usersRoles: true,
        userCompany: {company: true},
      },
      select: ["id", "userName", "usermail", "usersRoles", "color", "userMobile", "isActive"],
    });
  }
  

  findAllWithDbProc() {
    return this.userRepository.query("ggg @param1=1 ");
  }
  async signIn(createAuthDto: CreateAuthDto): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        usermail: createAuthDto.email,
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
    return await this.userRepository.findOne({
      where: { id: id },
      relations:{
        userCompany:true,
      },
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const ins = new User();
    ins.userName = updateUserDto.userName;
    ins.usermail = updateUserDto.usermail;
    ins.userMobile = updateUserDto.userMobile;
    return await this.userRepository.update(id, ins);
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
