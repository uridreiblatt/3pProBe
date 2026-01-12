import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Boxsize } from 'src/maintenence/boxes/entities/box.entity';
import { Order } from 'src/orders/order/entities/order.entity';

export class CreateOrderBoxDto {

  @ApiProperty({ default: 1 })
  @IsNumber()
  boxweight: number;
  //@IsNumber()
  // @ApiProperty({ default: 1 })
  // @IsNumber()
  // boxNo: number;
  @ApiProperty({ default: '' })
  @IsString()
  boxId: string ;
  @ApiProperty({ default: '' })
  @IsString()
  companyId: string;
   @ApiProperty({ default: '' })
   @IsString()
  orderId: string;
  @ApiProperty({ default: '' })
   @IsString()
  lineRemarks: string;
}
