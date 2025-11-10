import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { validateCompany } from 'src/util/validateCompany.util';
import { ApiTags } from '@nestjs/swagger';
@UseGuards(AuthGuard)
@ApiTags('zone-ok')
@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}
  
  @Post()
  async create(@Request() req ,@Body() createZoneDto: CreateZoneDto) {   
    return await this.zoneService.create(createZoneDto);
  } 
  @Get()
  async findAll(@Request() req  ) {    
    return await this.zoneService.findAll(req.user.selectCompany);
  }

  @Get(':id')
  async findOne(@Request() req ,@Param('id') id: string) {
    
    const res = await this.zoneService.findOne(+id);
    validateCompany (req.user.selectCompany , res.company.id);
    return res;
  }

  @Patch(':id')
  async update(@Request() req ,@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {   
    return this.zoneService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const res = await  this.zoneService.findOne(+id);    
    validateCompany (req.user.selectCompany , res.company.id);
    return this.zoneService.remove(+id);
  }
}
