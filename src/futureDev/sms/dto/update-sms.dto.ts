import { PartialType } from '@nestjs/swagger';
import { CreateSmDto } from './create-sms.dto';

export class UpdateSmDto extends PartialType(CreateSmDto) {}
