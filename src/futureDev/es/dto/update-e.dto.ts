import { PartialType } from '@nestjs/swagger';
import { CreateEDto } from './create-e.dto';

export class UpdateEDto extends PartialType(CreateEDto) {}
