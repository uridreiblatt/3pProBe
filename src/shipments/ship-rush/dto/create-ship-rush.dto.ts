import { ApiProperty } from '@nestjs/swagger';

export class CreateShipRushDto {
  @ApiProperty({ default: '' })
  shipmentId: string;
  @ApiProperty({ default: '' })
  trackingNumber: string;
  @ApiProperty({ default: '' })
  status: string;
  @ApiProperty({ default: '' })
  carrier: string;
}

export class ShipRushDto {
@ApiProperty({ nullable: false })
  siteName: string;
  @ApiProperty()
  uomweight: string;
  @ApiProperty()
  uomLength: string;
  @ApiProperty()
  upsAcountNumber: string;
  @ApiProperty()
  accountId: string;
  @ApiProperty()
  PickupReadyTime: string;
  @ApiProperty()
  LatestPickupTime: string;
  @ApiProperty()
  FirstName: string;
  @ApiProperty()
  Company: string;
  @ApiProperty()
  Address1: string;
  @ApiProperty()
  Address2: string;
  @ApiProperty({ name: 'City' })
  City: string;
  @ApiProperty({ name: 'State' })
  State: string;
  @ApiProperty({ name: 'Country' })
  Country: string;
  @ApiProperty()
  PostalCode: string;
  @ApiProperty()
  Phone: string;
  @ApiProperty()
  companyId: string;  



}
