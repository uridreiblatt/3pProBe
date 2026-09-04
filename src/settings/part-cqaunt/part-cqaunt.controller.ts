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
import { PartCqauntService } from './part-cqaunt.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePartCqauntDto } from './dto/create-part-cqaunt.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { validateCompany } from 'src/util/validateCompany.util';
import { UpdateCompanyDto } from 'src/usersCompanies/company/dto/update-company.dto';
import { UpdatePartCqauntDto } from './dto/update-part-cqaunt.dto';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('part-cqaunt-ok')
@UseGuards(AuthGuard)
@Controller('part-cqaunt')
export class PartCqauntController {
  constructor(private readonly partCqauntService: PartCqauntService) {}

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body() createPartCqauntDto: CreatePartCqauntDto,
  ) {
    return this.partCqauntService.create(createPartCqauntDto, companyId);
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.partCqauntService.findAll(companyId);
  }
  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.partCqauntService.findOne(id, companyId);
    return res;
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updatePartCqauntDto: UpdatePartCqauntDto,
  ) {
    return this.partCqauntService.update(id, updatePartCqauntDto, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    const res = await this.partCqauntService.findOne(id, companyId);
    return this.partCqauntService.remove(id, companyId);
  }
}
