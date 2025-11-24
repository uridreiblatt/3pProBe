import { Injectable } from '@nestjs/common';
import { CreateAuthDto, CreateAuthSwitchCompanyDto, JwtDetails } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/usersCompanies/users/users.service';
import { User } from 'src/usersCompanies/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    //private workerService: WorkerService,
  ) {}

  async signIn(signInDto: CreateAuthDto): Promise<User> {
    return await this.usersService.signIn(signInDto);
  }
  async SwitchCompany(switchCompanyDto: CreateAuthSwitchCompanyDto): Promise<User> {
    return await this.usersService.switchCompany(switchCompanyDto.UserUuid);
  }

  async signAsyncCookie(data: JwtDetails): Promise<{ access_token: string }> {
    const payload = {
      userName: data.userName,
      userEmail: data.userEmail,
      userUuid: data.uuid,
      role: data.userRole,
      selectCompany: data.userComapny,
      roles: data.roles,
      companies:  data.companies,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
