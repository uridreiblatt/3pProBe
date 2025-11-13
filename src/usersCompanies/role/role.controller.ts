import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/entities/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { rolesEnum } from 'src/auth/entities/role.enum';
@UseGuards(AuthGuard, RolesGuard)
@Roles(rolesEnum.SysAdmin, rolesEnum.Administrator)
@ApiTags('role-ok')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Post()
  // create(@Body() createRoleDto: CreateRoleDto) {
  //   return this.roleService.create(createRoleDto);
  // }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }


}
