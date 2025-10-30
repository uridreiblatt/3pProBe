import { Injectable, Dependencies } from "@nestjs/common";
import { InjectRepository, getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

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
    ins.usermail = createUserDto.usermail;
    ins.userMobile = createUserDto.userMobile;
    return await this.userRepository.save(ins);
  }

  async findAll(): Promise<any> {
    return await this.userRepository.find({
      where: {
        otp: "1",
      },
      relations: {
        usersRoles: true,
        userCompany: true,
      },
      select: ["id", "userName", "usermail", "usersRoles", "color"],
    });
  }
  

  findAllWithDbProc() {
    return this.userRepository.query("ggg @param1=1 ");
  }
  async signIn(createAuthDto: CreateAuthDto): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        usermail: createAuthDto.usermail,
        userPasswordEnc: createAuthDto.userPasswordEnc,
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

  async findOne(id: number) {
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
