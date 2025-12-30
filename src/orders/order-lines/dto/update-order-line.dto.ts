import { PartialType } from '@nestjs/swagger';
import { CreateOrderLineAssemblyAidDto, CreateOrderLineDto } from './create-order-line.dto';

export class UpdateOrderLineDto extends PartialType(CreateOrderLineDto) {}
export class UpdateOrderLineAssemblyAidDto extends PartialType(CreateOrderLineAssemblyAidDto) {}


