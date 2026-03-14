import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateNewCompanyDto {
  @ApiProperty({ default: "aaa-aaa-aaa" })
  @IsString()
  companyId: string; // required if you expect it in the body
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  AdminPassword: string;
  ///Erp
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priorityApiUrl: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priorityApiCompany: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priorityApiUser: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priorityApiPassword: string;
  @ApiProperty({ default: "In progress" })
  @IsString()
  priorityOrderStatus: string;
  @ApiProperty({ default: "Sent" })
  @IsString()
  priorityPoStatus: string;
  @ApiProperty({ default: "Wait Return" })
  @IsString()
  priorityRmaStatus: string;
  @ApiProperty({ default: "New" })
  @IsString()
  priorityProductStatus: string;
  @ApiProperty({ default: "In progress" })
  @IsString()
  priorityOrderLineStatus: string;
  /// shipment
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
  ///Config
  @ApiProperty({ default: false })
  @IsBoolean()
  addtionalPickingInfo: boolean;
  @ApiProperty({ default: false })
  @IsBoolean()
  qcRequired: boolean;
  @ApiProperty({ default: false })
  @IsBoolean()
  boxItemsCount: boolean;
}
