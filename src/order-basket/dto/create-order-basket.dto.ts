import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/order/entities/order.entity';

export class CreateOrderBasketDto {
  @ApiProperty({ default: 1 })
  basketId: string;
  @ApiProperty({ default: 1 })
  basketRemarks: string;
  @ApiProperty({ default: 1 })
  order: Order;
}
