import { ApiProperty } from "@nestjs/swagger";

export class CreateShipmentPriorityDto {
    @ApiProperty()
      ShipmentCode: string;
      @ApiProperty()
      ShippingMethod: string;
      @ApiProperty()
      priority: number;
      @ApiProperty()
      shipRushCode: string;
      @ApiProperty()
      shipRushAcountNumber: string;
      @ApiProperty()
      companyId: number;
}
