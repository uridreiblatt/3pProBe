import { PartialType } from '@nestjs/swagger';
import { CreateDeliverySettingDto, } from './create-delivery-setting.dto';

export class UpdateDeliverySettingDto extends PartialType(CreateDeliverySettingDto) {}
