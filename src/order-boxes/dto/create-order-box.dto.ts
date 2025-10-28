import { ApiProperty } from '@nestjs/swagger';
import { Boxsize } from 'src/boxes/entities/box.entity';
import { Order } from 'src/order/entities/order.entity';

export class CreateOrderBoxDto {
  @ApiProperty({ default: '' })
  lineRemarks: string;
  @ApiProperty({ default: 1 })
  boxweight: number;
  @ApiProperty({ default: 1 })
  boxNo: number;

  @ApiProperty({ default: 1 })
  boxSize: Boxsize;
  @ApiProperty({ default: 1 })
  order: Order;
}
