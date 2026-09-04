import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserCompanyService } from './user-company.service';
import { CreateUserCompanyDto } from './dto/create-user-company.dto';
import { UpdateUserCompanyDto } from './dto/update-user-company.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { rolesEnum } from 'src/auth/entities/role.enum';
import { Roles } from 'src/auth/entities/roles.decorator';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';

@ApiTags('user-company')
@UseGuards(AuthGuard)
@Roles(rolesEnum.SysAdmin, rolesEnum.Administrator)
@Controller('user-company')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Get()
  findAll(@CurrentCompanyId() companyId: string) {
    return this.userCompanyService.findAll(companyId);
  }
  @Get('findAllUsersByCompany')
  findAllUsersByCompany(@CurrentCompanyId() companyId: string) {
    return this.userCompanyService.findAllUsersByCompany(companyId);
  }
}
