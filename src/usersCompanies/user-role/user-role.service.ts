import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRoles } from './entities/user-role.entity';
import { Role } from 'src/usersCompanies/role/entities/role.entity';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UsersRoles)
    private userRoleRepository: Repository<UsersRoles>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(
    createUserRoleDto: CreateUserRoleDto,
    companyId: string,
    actorRole: number,
  ) {
    this.assertCanAssignRole(createUserRoleDto.roleId, actorRole);

    const user = await this.userRepository.findOne({
      where: {
        id: createUserRoleDto.userId,
        userCompany: {
          company: { id: companyId },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found in this company');
    }

    const ins = new UsersRoles();
    const rl = new Role();
    rl.id = createUserRoleDto.roleId;
    //ins.role.push(rl);
    ins.role = rl;
    const u = new User();
    u.id = createUserRoleDto.userId;
    ins.users = u;
    return await this.userRoleRepository.save(ins);
  }

  async findAll(companyId: string): Promise<any> {
    //console.log(companyId)
    const res = await this.userRoleRepository.find({
      where: {
        users: { isActive: true, userCompany: { company: { id: companyId } } },
      },
      relations: {
        users: true,
        role: true,
      },
      //select: ['id', 'userName', 'usermail', 'usersRoles', 'color'],
    });
    const resAll = res.map((userRole) => {
      return {
        id: userRole.id,
        role: userRole.role.role,
        user: userRole.users.userName,
        //roles: userCompany.role.role,
        isActive: userRole.isActive ? 'Active' : 'InActive',
      };
    });
    return resAll;
  }

  async findOne(id: string, companyId: string) {
    const res = await this.userRoleRepository.findOne({
      where: {
        id: id,
        users: { userCompany: { company: { id: companyId } } },
      },
      relations: {
        users: { userCompany: true },
        role: true,
      },
      //select: ['id', 'userName', 'usermail', 'usersRoles', 'color'],
    });
    if (!res) {
      throw new NotFoundException('User role not found in this company');
    }
    const resAll = {
      id: res.id,
      //role: res.role.role,
      user: res.users.userName,
      userId: res.users.id,
      role: res.role.role,
      roleId: res.role.id,

      isActive: res.isActive ? 'Active' : 'InActive',
    };
    return resAll;
  }

  async update(
    id: string,
    updateUserRoleDto: UpdateUserRoleDto,
    companyId: string,
    actorRole: number,
  ) {
    this.assertCanAssignRole(updateUserRoleDto.roleId, actorRole);

    const user = await this.userRepository.findOne({
      where: {
        id: updateUserRoleDto.userId,
        userCompany: {
          company: { id: companyId },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found in this company');
    }
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

  async remove(id: string) {
    return await this.userRoleRepository.delete(id);
  }

  private assertCanAssignRole(roleId: number, actorRole: number) {
    if (!Number.isInteger(actorRole) || roleId > actorRole) {
      throw new ForbiddenException(
        'You cannot assign a role higher than your own role',
      );
    }
  }
}
