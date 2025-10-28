import { PartialType } from '@nestjs/swagger';
import { CreateOrderBasketDto } from './create-order-basket.dto';

export class UpdateOrderBasketDto extends PartialType(CreateOrderBasketDto) {}
