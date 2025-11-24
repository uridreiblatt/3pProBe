import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  userSurname: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
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
  @IsOptional()
  otp: string;
 @ApiProperty() 
 @IsBoolean()
  isActive: boolean;
   @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  role: string;
 @ApiProperty()
  @IsString()
  @IsOptional()
  companyId: string;
@ApiProperty()
  @IsString()
  @IsOptional()
  status: string;
@ApiProperty()
  @IsString()
  @IsOptional()
  avatarUrl: string;

@ApiProperty()
  @IsString()
  @IsOptional()
  selectedCompany: string;
  



  


  

  
  
}
