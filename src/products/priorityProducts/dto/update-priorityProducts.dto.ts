import { PartialType } from '@nestjs/swagger';
import { CreatePartDto } from './create-priorityProducts.dto';

export class UpdatePartDto extends PartialType(CreatePartDto) {}
