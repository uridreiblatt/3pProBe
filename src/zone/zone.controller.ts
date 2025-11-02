import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req ,@Body() createZoneDto: CreateZoneDto) {
    if (req.user.selectCompany !== createZoneDto.companyId)
    {
        console.error('invalid company');
        throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: 'BAD_REQUEST',
            }, HttpStatus.BAD_REQUEST, {
              cause: 'invalid company one'
            });
    }
    return await this.zoneService.create(createZoneDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req  ) {    
    return await this.zoneService.findAll(req.user.selectCompany);
  }

  @Get(':id')
  async findOne(@Request() req ,@Param('id') id: string) {
    
    const zone = await this.zoneService.findOne(+id);
    if (req.user.selectCompany !== zone.company.id)
        throw BadRequestException;
    return zone;
  }

  @Patch(':id')
  async update(@Request() req ,@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    if (req.user.selectCompany !== updateZoneDto.companyId)
        throw BadRequestException;
    return this.zoneService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const zone = await  this.zoneService.findOne(+id);
    if (req.user.selectCompany !== zone.company.id)
        throw BadRequestException;
    return this.zoneService.remove(+id);
  }
}
