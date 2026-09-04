import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CompanySettingsService } from './company-settings.service';
import { CreateCompanySettingDto } from './dto/create-company-setting.dto';
import { UpdateCompanySettingDto } from './dto/update-company-setting.dto';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@Controller('company-settings')
export class CompanySettingsController {
  constructor(
    private readonly companySettingsService: CompanySettingsService,
  ) {}

  @Post()
  async create(
    @CurrentCompanyId() companyId: string,
    @Body() createCompanySettingDto: CreateCompanySettingDto,
  ) {
    return await this.companySettingsService.create(
      createCompanySettingDto,
      companyId,
    );
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.companySettingsService.findAll(companyId);
  }

  @Get(':id')
  findOne(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.companySettingsService.findOne(id, companyId);
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateCompanySettingDto: UpdateCompanySettingDto,
  ) {
    return this.companySettingsService.update(
      id,
      updateCompanySettingDto,
      companyId,
    );
  }

  @Delete(':id')
  remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.companySettingsService.remove(id, companyId);
  }
}
