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
