import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CreateShipmentPriorityDto {
  @ApiProperty()
  @IsString()
  ShipmentCode: string;
  @ApiProperty()
  @IsString()
  ShippingMethod: string;
  @ApiProperty()
  @Type(() => Number) // "1" -> 1
  @IsInt()
  priority: number;
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
