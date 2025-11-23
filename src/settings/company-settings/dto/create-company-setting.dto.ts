import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCompanySettingDto {
  @ApiProperty()
  @IsString()
  priorityApiUrl: string;
  @ApiProperty()
  @IsString()
  priorityApiCompany: string;
  
  @ApiProperty()
  @IsString()
  priorityApiUser: string;
  @ApiProperty()
  @IsString()
  priorityApiPassword: string;
  @ApiProperty()
  @IsString()
  priorityOrderStatus: string;
  @ApiProperty()
  @IsString()
  priorityPoStatus: string;
  @ApiProperty()
  @IsString()
  priorityRmaStatus: string;
  @ApiProperty()
  @IsString()
  companyId: string;
  @ApiProperty()
  @IsString()
  priorityProductStatus:string;
}
