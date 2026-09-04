import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { validateCompany } from 'src/util/validateCompany.util';
import { ApiTags } from '@nestjs/swagger';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@UseGuards(AuthGuard)
@ApiTags('zone')
@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createZoneDto: CreateZoneDto,
  ) {
    return await this.zoneService.create(createZoneDto, companyId);
  }
  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.zoneService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.zoneService.findOne(id, companyId);
    return res;
  }

  @Patch(':id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateZoneDto: UpdateZoneDto,
  ) {
    return this.zoneService.update(id, updateZoneDto, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.zoneService.remove(id, companyId);
  }
}
