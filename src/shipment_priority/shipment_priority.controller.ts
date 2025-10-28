import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ShipmentPriorityService } from './shipment_priority.service';
import { CreateShipmentPriorityDto } from './dto/create-shipment_priority.dto';
import { UpdateShipmentPriorityDto } from './dto/update-shipment_priority.dto';

@Controller('shipment-priority')
export class ShipmentPriorityController {
  constructor(
    private readonly shipmentPriorityService: ShipmentPriorityService,
  ) {}

  @Post()
  create(@Body() createShipmentPriorityDto: CreateShipmentPriorityDto) {
    return this.shipmentPriorityService.create(createShipmentPriorityDto);
  }

  @Get()
  findAll() {
    return this.shipmentPriorityService.findAll(1);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentPriorityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipmentPriorityDto: UpdateShipmentPriorityDto) {
    return this.shipmentPriorityService.update(+id, updateShipmentPriorityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentPriorityService.remove(+id);
  }
}


