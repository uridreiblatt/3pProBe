import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from 'src/usersCompanies/company/dto/create-company.dto';
import { UpdateCompanyDto } from 'src/usersCompanies/company/dto/update-company.dto';
import { CreateUserDto } from './dto/create-user.dto';

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
      create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
      }
    
      @Get()
      async findAll() {
         return await this.usersService.findAll();
      }
    
      @Get(':id')
      async findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
      }
    
      @Patch(':id')
      async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
        return this.usersService.update(+id, updateCompanyDto);
      }
    
      @Delete(':id')
      async remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
      }

}


