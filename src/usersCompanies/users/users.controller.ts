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
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from 'src/usersCompanies/company/dto/create-company.dto';
import { UpdateCompanyDto } from 'src/usersCompanies/company/dto/update-company.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { rolesEnum } from 'src/auth/entities/role.enum';
import { Roles } from 'src/auth/entities/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { SkipCookieMatch } from 'src/auth/entities/skip-cookie-match.decorator';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@UseGuards(AuthGuard)
@Roles(rolesEnum.SysAdmin, rolesEnum.Administrator)
@ApiTags('users')
@Controller('users')
export class UsersController {
  companyService: any;
  constructor(private readonly usersService: UsersService) {}

  // @Get(':id')
  //   async findOne(@Param('id') id: string) {
  //     return await this.usersService.findAllRoles();
  //   }

  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto, companyId);
  }
  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.usersService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    return this.usersService.findOne(id, companyId);
  }
  @Patch(':id')
  async update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    const res = await this.usersService.findOne(id, companyId);
    //validateCompany (companyId , res.userCompany.id);
    return this.usersService.remove(id, companyId);
  }
}
