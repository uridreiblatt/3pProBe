import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  userSurname: string;

  @ApiProperty()
  @IsString()
  userUuid: string;
  @IsEmail()
  usermail: string;
  @ApiProperty()
  @IsString()
  userMobile: string;
  @ApiProperty()
  @IsString()
  userPasswordEnc: string;
  @ApiProperty()
  @IsString()
  otp: string;
 @ApiProperty() 
 @IsBoolean()
  isActive: boolean;
}
