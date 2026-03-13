import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateNewCompanyDto {
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
  @ApiProperty({ default: "Open" })
  @IsString()
  priorityOrderStatus: string;
  @ApiProperty({ default: "Open" })
  @IsString()
  priorityPoStatus: string;
  @ApiProperty({ default: "Open" })
  @IsString()
  priorityRmaStatus: string;
  @ApiProperty({ default: "Open" })
  @IsString()
  priorityProductStatus: string;
  @ApiProperty({ default: "Open" })
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
  @ApiProperty({default: false})
  @IsBoolean()
  addtionalPickingInfo: boolean;
  @ApiProperty({default: false})
  @IsBoolean()
  qcRequired: boolean;
  @ApiProperty({default: false})
  @IsBoolean()
  boxItemsCount: boolean;  
}
