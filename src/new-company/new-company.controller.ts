import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewCompanyService } from './new-company.service';
import { CreateNewCompanyDto } from './dto/create-new-company.dto';
import { UpdateNewCompanyDto } from './dto/update-new-company.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('new-company')
@Controller('new-company')
export class NewCompanyController {
  constructor(private readonly newCompanyService: NewCompanyService) {}

  @Post()
  create(@Body() createNewCompanyDto: CreateNewCompanyDto) {
    return this.newCompanyService.create(createNewCompanyDto);
  }

  // @Get()
  // findAll() {
  //   return this.newCompanyService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.newCompanyService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNewCompanyDto: UpdateNewCompanyDto) {
  //   return this.newCompanyService.update(+id, updateNewCompanyDto);
  // }

  @Delete(':id/:AdminPassword')
  remove(@Param('id') id: string, @Param('AdminPassword') AdminPassword: string) {
    return this.newCompanyService.remove(id, AdminPassword);
  }
}
