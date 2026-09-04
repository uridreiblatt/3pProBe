import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ShipmentPriorityService } from './shipment_priority.service';
import { CreateShipmentPriorityDto } from './dto/create-shipment_priority.dto';
import { UpdateShipmentPriorityDto } from './dto/update-shipment_priority.dto';
import { validateCompany } from 'src/util/validateCompany.util';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('shipment-priority-ok')
@UseGuards(AuthGuard)
@Controller('shipment-priority')
export class ShipmentPriorityController {
  constructor(
    private readonly shipmentPriorityService: ShipmentPriorityService,
  ) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createShipmentPriorityDto: CreateShipmentPriorityDto,
  ) {
    return await this.shipmentPriorityService.create(
      createShipmentPriorityDto,
      companyId,
    );
  }
  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.shipmentPriorityService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.shipmentPriorityService.findOne(id, companyId);
    return res;
  }

  @Get('findOneByStCode:id')
  async findOneByStCode(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.shipmentPriorityService.findOne(id, companyId);
    return res;
  }

  @Patch(':id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateShipmentPriorityDto: UpdateShipmentPriorityDto,
  ) {
    return this.shipmentPriorityService.update(
      id,
      updateShipmentPriorityDto,
      companyId,
    );
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    const res = await this.shipmentPriorityService.findOne(id, companyId);
    return this.shipmentPriorityService.remove(id, companyId);
  }
}
