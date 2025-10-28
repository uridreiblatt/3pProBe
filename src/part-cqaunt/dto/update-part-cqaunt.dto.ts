import { PartialType } from '@nestjs/swagger';
import { CreatePartCqauntDto } from './create-part-cqaunt.dto';

export class UpdatePartCqauntDto extends PartialType(CreatePartCqauntDto) {}
