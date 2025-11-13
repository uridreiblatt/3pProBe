import { PartialType } from '@nestjs/swagger';
import { CreateAllRmaDto } from './create-all-rma.dto';

export class UpdateAllRmaDto extends PartialType(CreateAllRmaDto) {}
