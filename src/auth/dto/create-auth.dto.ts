import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ default: 'urid@gmail.com' })

  @IsEmail()
  usermail: string;
  @ApiProperty({
    default: 'aaa',
  })
  @IsString()
  userPasswordEnc: string;
}
export class SwitchCompanyDto {
  @ApiProperty()
  companyId: number;  
}

export class CreateAuthSwitchCompanyDto {
  @ApiProperty()
  companyId: number; 
  @ApiProperty()
  UserUuid: string;  
}
export class AuthOtp {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  otp: string;
}

export class JwtDetails {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  userRole: string;
  @ApiProperty()
  userComapny: number;
}
