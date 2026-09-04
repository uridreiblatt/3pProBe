import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty({ default: '' })
  @IsString()
  @IsOptional()
  userSurname: string;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // userUuid: string;
  @IsEmail()
  userMail: string;
  @ApiProperty()
  @IsString()
  userMobile: string;
  @ApiProperty()
  @IsString()
  userPasswordEnc: string;
  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // otp: string;
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // id: string;

  // @ApiProperty()
  // @IsString()
  // @IsOptional()
  // role: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  selectedCompany: string;
}
