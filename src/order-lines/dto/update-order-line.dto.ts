import { PartialType } from '@nestjs/swagger';
import { CreateOrderLineDto } from './create-order-line.dto';

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {}
