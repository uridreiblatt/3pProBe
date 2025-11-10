import { PartialType } from '@nestjs/swagger';
import { CreateShipRushDto } from './create-ship-rush.dto';

export class UpdateShipRushDto extends PartialType(CreateShipRushDto) {}
