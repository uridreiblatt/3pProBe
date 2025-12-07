import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class CreateShipmentPriorityDto {
  @ApiProperty()
  @IsString()
  ShipmentCode: string;
  @ApiProperty()
  @IsString()
  ShippingMethod: string;
  @ApiProperty()
 
  @IsBoolean()
  priority: boolean;
  @ApiProperty()
  @IsString()
  shipRushCode: string;
  @ApiProperty()
  @IsString()
  shipRushAcountNumber: string;
  @ApiProperty()
   @IsString()
  companyId: string;
}
