import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

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
  priorityProductStatus: string;
  @ApiProperty()
  @IsBoolean()
  addtionalPickingInfo: boolean;
  @ApiProperty()
  @IsBoolean()
  qcRequired: boolean;
  @ApiProperty()
  @IsString()
  shipmentUrl: string;
  @ApiProperty()
  @IsString()
  shipmentUser: string;
  @ApiProperty()
  @IsString()
  shipmentPassword: string;
  @ApiProperty()
  @IsString()
  shipmentCallBack: string;
  @ApiProperty()
  @IsBoolean()
  boxItemsCount: boolean;
}
