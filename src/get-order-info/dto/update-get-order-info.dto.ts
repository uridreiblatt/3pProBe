import { PartialType } from '@nestjs/swagger';
import { CreateGetOrderInfoDto } from './create-get-order-info.dto';

export class UpdateGetOrderInfoDto extends PartialType(CreateGetOrderInfoDto) {}
