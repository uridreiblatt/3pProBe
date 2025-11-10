import { PartialType } from '@nestjs/swagger';
import { CreateTaskInventoryCountDto } from './create-task-inventory-count.dto';

export class UpdateTaskInventoryCountDto extends PartialType(CreateTaskInventoryCountDto) {}
