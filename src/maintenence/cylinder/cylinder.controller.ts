import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CylinderService } from './cylinder.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCylinderDto } from './dto/update-cylinder.dto';
import { CreateCylinderDto } from './dto/create-cylinder.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { validateCompany } from 'src/util/validateCompany.util';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@UseGuards(AuthGuard)
@Controller('cylinder')
@ApiTags('cylinder-ok')
export class CylinderController {
  constructor(private readonly cylinderService: CylinderService) {}

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body() createCylinderDto: CreateCylinderDto,
  ) {
    return this.cylinderService.create(createCylinderDto, companyId);
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.cylinderService.findAll(companyId);
  }
  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.cylinderService.findOne(id, companyId);
    return res;
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateCylinderDto: UpdateCylinderDto,
  ) {
    return this.cylinderService.update(id, updateCylinderDto, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.cylinderService.remove(id, companyId);
  }
}
