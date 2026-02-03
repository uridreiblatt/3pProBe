import { Injectable } from "@nestjs/common";
import {
  CreateAuthDto,
  CreateAuthSwitchCompanyDto,
  JwtDetails,
} from "./dto/create-auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/usersCompanies/users/users.service";
import { User } from "src/usersCompanies/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) //private workerService: WorkerService,
  {}

  async signIn(
    signInDto: CreateAuthDto
  ): Promise<{ user: User; users: User[] }> {
    const user = await this.usersService.signIn(signInDto);
    let cmp = user.selectedCompany;
    if (cmp === "0") cmp = user.userCompany[0].company.id;

    const users = await this.usersService.findAll(cmp);

    return { user, users };
  }
  async SwitchCompany(
    switchCompanyDto: CreateAuthSwitchCompanyDto
  ): Promise<User> {
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
      companies: data.companies,
      addtionalPickingInfo: data.addtionalPickingInfo,
      users: data.users,
      //exp: Math.floor(Date.now() / 1000) + 60 * 60 * 9 // 24h
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: "12h",
      }),
    };
  }
}
