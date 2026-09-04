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
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { validateCompanies } from 'src/util/validateCompany.util';
import { Roles } from 'src/auth/entities/roles.decorator';
import { rolesEnum } from 'src/auth/entities/role.enum';
import {
  CurrentCompanyId,
  CurrentRoleId,
} from 'src/auth/entities/current-user.decorator';

@ApiTags('user-role')
@UseGuards(AuthGuard)
@Roles(rolesEnum.SysAdmin, rolesEnum.Administrator)
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  //
  @Post()
  create(
    @CurrentCompanyId() companyId: string,
    @CurrentRoleId() roleId: number,
    @Body() createUserRoleDto: CreateUserRoleDto,
  ) {
    return this.userRoleService.create(createUserRoleDto, companyId, roleId);
  }

  @Get()
  findAll(@CurrentCompanyId() companyId: string) {
    return this.userRoleService.findAll(companyId);
  }

  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.userRoleService.findOne(id, companyId);
    //validateCompanies (companyId , res.users.userCompany); // add find in loop
    return res;
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @CurrentRoleId() roleId: number,
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(
      id,
      updateUserRoleDto,
      companyId,
      roleId,
    );
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    const res = await this.userRoleService.findOne(id, companyId);
    //validateCompanies (companyId , res.users.userCompany);
    return this.userRoleService.remove(id);
  }
}
