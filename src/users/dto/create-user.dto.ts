import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  id: number;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  userSurname: string;

  @ApiProperty()
  userUuid: string;
  //@IsEmail()
  usermail: string;
  @ApiProperty()
  userMobile: string;
  @ApiProperty()
  userPasswordEnc: string;
  @ApiProperty()
  otp: string;
}
