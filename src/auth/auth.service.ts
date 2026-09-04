import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateAuthDto,
  CreateAuthSwitchCompanyDto,
  JwtDetails,
} from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/usersCompanies/users/users.service';
import { User } from 'src/usersCompanies/users/entities/user.entity';
import { DeliverySettingService } from 'src/shipments/delivery-setting/delivery-setting.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private deliverySettingService: DeliverySettingService,
    private jwtService: JwtService,
  ) {
    //private workerService: WorkerService,
  }

  async signIn(
    signInDto: CreateAuthDto,
  ): Promise<{ user: User; users: User[]; uomWeight: string }> {
    try {
      const user = await this.usersService.signIn(signInDto);

      let cmp = user.selectedCompany;
      if (cmp === '0') cmp = user.userCompany[0].company.id;

      const users = await this.usersService.findAll(cmp);
      const deliverySetting =
        await this.deliverySettingService.findOneBySite(cmp);

      return { user, users, uomWeight: deliverySetting?.uomweight || 'pttt' };
    } catch (error) {
      console.log('signIn', error);
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
  }
  // async SwitchCompany(
  //   switchCompanyDto: CreateAuthSwitchCompanyDto
  // ): Promise<User> {
  //   return await this.usersService.switchCompany(switchCompanyDto.UserUuid);
  // }

  async signAsyncCookie(data: JwtDetails): Promise<{ access_token: string }> {
    const payload = {
      //userName: data.userName,
      //userEmail: data.userEmail,
      userUuid: data.uuid,
      role: data.userRole,
      selectCompany: data.userComapny,
      roles: data.roles,
      companies: data.companies,
      //addtionalPickingInfo: data.addtionalPickingInfo,
      //qcRequired: data.qcRequired,
      //boxItemsCount: data.boxItemsCount,
      //users: data.users,
      //uomWeight: data.uomWeight,
      //exp: Math.floor(Date.now() / 1000) + 60 * 60 * 9 // 24h
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '8h',
      }),
    };
  }
}
