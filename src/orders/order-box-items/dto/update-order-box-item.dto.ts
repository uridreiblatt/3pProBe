import { PartialType } from '@nestjs/swagger';
import { CreateOrderBoxItemDto } from './create-order-box-item.dto';

export class UpdateOrderBoxItemDto extends PartialType(CreateOrderBoxItemDto) {
    
}
