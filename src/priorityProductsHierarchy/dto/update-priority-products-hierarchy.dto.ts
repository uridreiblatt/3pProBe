import { PartialType } from '@nestjs/swagger';
import { CreatePriorityProductsHierarchyDto } from './create-priority-products-hierarchy.dto';

export class UpdatePriorityProductsHierarchyDto extends PartialType(
  CreatePriorityProductsHierarchyDto,
) {}
