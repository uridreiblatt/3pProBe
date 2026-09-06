import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ default: 'urid@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({
    default: '1234567',
  })
  @IsString()
  password: string;
}
export class SwitchCompanyDto {
  @ApiProperty()
  companyId: string;
}

export class CreateAuthSwitchCompanyDto {
  @ApiProperty()
  companyId: string;
  @ApiProperty()
  UserUuid: string;
}
export class AuthOtp {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  otp: string;
}
export class company {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}
export class role {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class JwtDetails {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  userEmail: string;
  @ApiProperty()
  userRole: string;
  @ApiProperty()
  userCompany: string;
  @ApiProperty()
  companies: company[];
  @ApiProperty()
  roles: role[];
  @ApiProperty()
  addtionalPickingInfo: boolean;
  @ApiProperty()
  qcRequired: boolean;
  @ApiProperty()
  boxItemsCount: boolean;
  @ApiProperty()
  users: user[];
  @ApiProperty()
  uomWeight: string;
}
export class user {
  @ApiProperty()
  id: string;
  @ApiProperty()
  userName: string;
}
