import { Injectable } from "@nestjs/common";
import { CreateUserRoleDto } from "./dto/create-user-role.dto";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersRoles } from "./entities/user-role.entity";
import { Role } from "src/usersCompanies/role/entities/role.entity";
import { User } from "src/usersCompanies/users/entities/user.entity";
import { Company } from "../company/entities/company.entity";

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UsersRoles)
    private userRoleRepository: Repository<UsersRoles>
  ) {}
  async create(createUserRoleDto: CreateUserRoleDto) {
    const ins = new UsersRoles();
    const rl = new Role();
    rl.id = createUserRoleDto.roleId;
    //ins.role.push(rl);
    ins.role = rl;
    const u = new User();
    u.id = createUserRoleDto.userId;    
    ins.users = u;
    //ins.users.push(u);
    console.log(ins);
    return await this.userRoleRepository.save(ins);
  }

  async findAll(companyId:  number): Promise<any> {
    return await this.userRoleRepository.find({
      where : {users: {userCompany: {id: companyId}}},
      relations: {
        users: {userCompany: true,},
      },
      //select: ['id', 'userName', 'usermail', 'usersRoles', 'color'],
    });
  }

  async findOne(id: number) {
    return await this.userRoleRepository.findOne({
      where:{
        id:id,
        //users: {userCompany:{ id: 1 }},
      },
      relations: {
        users: {userCompany: true,},
      },
      //select: ['id', 'userName', 'usermail', 'usersRoles', 'color'],
    });
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const ins = new UsersRoles();
    const rl = new Role();
    rl.id = updateUserRoleDto.roleId;
    //ins.role.push(rl);
    ins.role = rl;
    const u = new User();
    u.id = updateUserRoleDto.userId;    
    //ins.users.push(u);
    ins.users = u;
    
    

    return await this.userRoleRepository.update(id, ins);
  }

  async remove(id: number) {
    return await this.userRoleRepository.delete(id);
  }
}
