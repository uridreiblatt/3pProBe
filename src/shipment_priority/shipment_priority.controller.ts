import { Controller } from '@nestjs/common';
import { ShipmentPriorityService } from './shipment_priority.service';

@Controller('shipment-priority')
export class ShipmentPriorityController {
  constructor(
    private readonly shipmentPriorityService: ShipmentPriorityService,
  ) {}

  // @Post()
  // create(@Body() createShipmentPriorityDto: CreateShipmentPriorityDto) {
  //   return this.shipmentPriorityService.create(createShipmentPriorityDto);
  // }

  // @Get()
  // findAll() {
  //   return this.shipmentPriorityService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.shipmentPriorityService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateShipmentPriorityDto: UpdateShipmentPriorityDto) {
  //   return this.shipmentPriorityService.update(+id, updateShipmentPriorityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.shipmentPriorityService.remove(+id);
  // }
}
