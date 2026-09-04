import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDeliverySettingDto {
  @ApiProperty({ default: '' })
  shipmentId: string;
  @ApiProperty({ default: '' })
  trackingNumber: string;
  @ApiProperty({ default: '' })
  status: string;
  @ApiProperty({ default: '' })
  carrier: string;
}

export class DeliverySettingDto {
  @ApiProperty({ nullable: false })
  @IsString()
  siteName: string;
  @ApiProperty()
  @IsString()
  uomweight: string;
  @ApiProperty()
  @IsString()
  uomLength: string;
  @ApiProperty()
  @IsString()
  upsAcountNumber: string;
  @ApiProperty()
  @IsString()
  accountId: string;
  @ApiProperty()
  @IsString()
  PickupReadyTime: string;
  @ApiProperty()
  @IsString()
  LatestPickupTime: string;
  @ApiProperty()
  @IsString()
  FirstName: string;
  @ApiProperty()
  @IsString()
  Company: string;
  @ApiProperty()
  @IsString()
  Address1: string;
  @ApiProperty()
  @IsString()
  Address2: string;
  @ApiProperty({ name: 'City' })
  @IsString()
  City: string;
  @ApiProperty({ name: 'State' })
  @IsString()
  State: string;
  @ApiProperty({ name: 'Country' })
  @IsString()
  Country: string;
  @ApiProperty()
  @IsString()
  PostalCode: string;
  @ApiProperty()
  @IsString()
  Phone: string;
}
