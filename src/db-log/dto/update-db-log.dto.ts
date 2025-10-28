import { PartialType } from '@nestjs/swagger';
import { CreateDbLogDto } from './create-db-log.dto';

export class UpdateDbLogDto extends PartialType(CreateDbLogDto) {}
