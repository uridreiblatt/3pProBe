import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/entities/roles.decorator';
import { rolesEnum } from 'src/auth/entities/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { SkipCookieMatch } from 'src/auth/entities/skip-cookie-match.decorator';
@SkipCookieMatch()
@UseGuards(AuthGuard, RolesGuard)
@Roles(rolesEnum.SysAdmin, rolesEnum.Administrator)
@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
