import { PartialType } from '@nestjs/swagger';
import { CreatePriorityProductsLocationDto } from './create-priority-products-location.dto';

export class UpdatePriorityProductsLocationDto extends PartialType(
  CreatePriorityProductsLocationDto,
) {}
