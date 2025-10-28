import { Injectable, Dependencies } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
@Dependencies(getRepositoryToken(User))
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<any> {
    return await this.userRepository.find({
      where: {
        otp: '1',
      },
      relations: {
        usersRoles: true,
      },
      select: ['id', 'userName', 'usermail', 'usersRoles', 'color'],
    });
  }

  findAllWithDbProc() {
    return this.userRepository.query('ggg @param1=1 ');
  }
  async findOne(createAuthDto: CreateAuthDto): Promise<any> {
    return await this.userRepository.findOne({
      where: {
        usermail: createAuthDto.usermail,
        userPasswordEnc: createAuthDto.userPasswordEnc,
      },
      relations: {
        usersRoles: {
          role: true,
        },
      },
    });
  }
}
