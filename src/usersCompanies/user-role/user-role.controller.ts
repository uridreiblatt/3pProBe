import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { validateCompanies } from 'src/util/validateCompany.util';


@ApiTags('user-role-ok')
@UseGuards(AuthGuard)
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

//
  @Post()
  create( @Request() req, @Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  findAll(@Request() req,) {
    return this.userRoleService.findAll(req.user.userID);
  }

  @Get(':id')
  async findOne(@Request() req,@Param('id') id: string) {    
    const res = await this.userRoleService.findOne(id);
        validateCompanies (req.user.selectCompany , res.users.userCompany); // add find in loop
        return res;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  async remove(@Request() req,@Param('id') id: string) {    
    const res = await this.userRoleService.findOne(id);
    validateCompanies (req.user.selectCompany , res.users.userCompany);
    return this.userRoleService.remove(id);
  }
}
