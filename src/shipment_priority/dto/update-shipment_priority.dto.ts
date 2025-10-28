import { PartialType } from '@nestjs/swagger';
import { CreateShipmentPriorityDto } from './create-shipment_priority.dto';

export class UpdateShipmentPriorityDto extends PartialType(CreateShipmentPriorityDto) {}
