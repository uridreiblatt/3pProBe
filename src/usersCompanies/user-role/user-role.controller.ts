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

@ApiTags('user-role')
@UseGuards(AuthGuard)
@Roles(rolesEnum.SysAdmin, rolesEnum.Administrator)
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  //
  @Post()
  create(@Request() req, @Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(
      createUserRoleDto,
      req.user.selectCompany,
    );
  }

  @Get()
  findAll(@Request() req) {
    return this.userRoleService.findAll(req.user.selectCompany);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const res = await this.userRoleService.findOne(id, req.user.selectCompany);
    //validateCompanies (req.user.selectCompany , res.users.userCompany); // add find in loop
    return res;
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(
      id,
      updateUserRoleDto,
      req.user.selectCompany,
    );
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const res = await this.userRoleService.findOne(id, req.user.selectCompany);
    //validateCompanies (req.user.selectCompany , res.users.userCompany);
    return this.userRoleService.remove(id);
  }
}
