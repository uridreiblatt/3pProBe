import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderBoxDto } from './create-order-box.dto';
import { IsString } from 'class-validator';

export class UpdateOrderBoxDto extends PartialType(CreateOrderBoxDto) {
}
