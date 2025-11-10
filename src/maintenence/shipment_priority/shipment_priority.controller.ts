import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ShipmentPriorityService } from './shipment_priority.service';
import { CreateShipmentPriorityDto } from './dto/create-shipment_priority.dto';
import { UpdateShipmentPriorityDto } from './dto/update-shipment_priority.dto';
import { validateCompany } from 'src/util/validateCompany.util';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('shipment-priority-ok')
@UseGuards(AuthGuard)
@Controller('shipment-priority')
export class ShipmentPriorityController {
  constructor(
    private readonly shipmentPriorityService: ShipmentPriorityService,
  ) {}


  @Post()
    async create(@Request() req ,@Body() createShipmentPriorityDto: CreateShipmentPriorityDto) {   
      return await this.shipmentPriorityService.create(createShipmentPriorityDto);
    } 
    @Get()
    async findAll(@Request() req  ) {    
      return await this.shipmentPriorityService.findAll(req.user.selectCompany);
    }
  
    @Get(':id')
    async findOne(@Request() req ,@Param('id') id: number) {
      
      const res = await this.shipmentPriorityService.findOne(+id);
      console.log(id, res)
      validateCompany (req.user.selectCompany , res.company.id);
      return res;
    }

    @Get('findOneByStCode:id')
    async findOneByStCode(@Request() req ,@Param('id') id: number) {
      
      const res = await this.shipmentPriorityService.findOne(+id);
      validateCompany (req.user.selectCompany , res.company.id);
      return res;
    }
  
    @Patch(':id')
    async update(@Request() req ,@Param('id') id: string, @Body() updateShipmentPriorityDto: UpdateShipmentPriorityDto) {   
      return this.shipmentPriorityService.update(+id, updateShipmentPriorityDto);
    }
  
    @Delete(':id')
    async remove(@Request() req, @Param('id') id: number) {
      const res = await  this.shipmentPriorityService.findOne(id);    
      validateCompany (req.user.selectCompany , res.company.id);
      return this.shipmentPriorityService.remove(+id);
    }




  
}


