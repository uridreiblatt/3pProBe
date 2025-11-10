import { PartialType } from '@nestjs/swagger';
import { CreateOrderBoxDto } from './create-order-box.dto';

export class UpdateOrderBoxDto extends PartialType(CreateOrderBoxDto) {}
