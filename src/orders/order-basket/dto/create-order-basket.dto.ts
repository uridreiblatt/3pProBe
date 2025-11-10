import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Order } from 'src/orders/order/entities/order.entity';

export class CreateOrderBasketDto {
  @ApiProperty({  })
  @IsString()
  basketId: string;
  @ApiProperty({  })
  @IsString()
  basketRemarks: string;
  @ApiProperty({})
  order: Order;
}
