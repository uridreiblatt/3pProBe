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

@ApiTags('user-company')
@UseGuards(AuthGuard)
@Roles(rolesEnum.SysAdmin, rolesEnum.Administrator)
@Controller('user-company')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Get()
  findAll(@Request() req) {
    return this.userCompanyService.findAll(req.user.selectCompany);
  }
  @Get('findAllUsersByCompany')
  findAllUsersByCompany(@Request() req) {
    return this.userCompanyService.findAllUsersByCompany(
      req.user.selectCompany,
    );
  }
}
