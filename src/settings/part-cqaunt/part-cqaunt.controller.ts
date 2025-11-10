import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { PartCqauntService } from './part-cqaunt.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/usersCompanies/role/dto/create-role.dto';
import { UpdateRoleDto } from 'src/usersCompanies/role/dto/update-role.dto';
import { CreatePartCqauntDto } from './dto/create-part-cqaunt.dto';
@ApiTags('part-cqaunt')
@Controller('part-cqaunt')
export class PartCqauntController {
  constructor(private readonly partCqauntService: PartCqauntService) {}

  @Get()
  findAll() {
    return this.partCqauntService.findAll(1);
  }

  @Post()
    create(@Body() createPartCqauntDto: CreatePartCqauntDto) {
      return this.partCqauntService.create(createPartCqauntDto);
    }
  
    
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.partCqauntService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
      return this.partCqauntService.update(+id, updateRoleDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.partCqauntService.remove(+id);
    }
}
