import { PartialType } from '@nestjs/swagger';
import { CreateAllInventoryDto } from './create-all-inventory.dto';

export class UpdateAllInventoryDto extends PartialType(CreateAllInventoryDto) {}
