import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ default: 'urid@gmail.com' })
  usermail: string;
  @ApiProperty({
    default: 'aaa',
  })
  userPasswordEnc: string;
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
}
