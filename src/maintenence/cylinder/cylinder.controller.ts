import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { CylinderService } from './cylinder.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCylinderDto } from './dto/update-cylinder.dto';
import { CreateCylinderDto } from './dto/create-cylinder.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { validateCompany } from 'src/util/validateCompany.util';

@UseGuards(AuthGuard)
@Controller('cylinder')
@ApiTags('cylinder-ok')
export class CylinderController {
  constructor(private readonly cylinderService: CylinderService) {}

  @Post()
  create(@Body() createCylinderDto: CreateCylinderDto) {
    return this.cylinderService.create(createCylinderDto);
  }

   @Get()
    async findAll(@Request() req) {
      return await this.cylinderService.findAll(req.user.selectCompany);
    }
    @Get(":id")
    async findOne(@Request() req, @Param("id") id: string) {
      const res = await this.cylinderService.findOne(+id);
      validateCompany (req.user.selectCompany , res.company.id);
      return res;
    }

  @Patch(':id')
  update(@Request() req,@Param('id') id: string, @Body() updateCylinderDto: UpdateCylinderDto) {
    return this.cylinderService.update(+id, updateCylinderDto);
  }

  @Delete(":id")
  async remove(@Request() req, @Param("id") id: string) {
    const res = await this.cylinderService.findOne(+id);
    validateCompany (req.user.selectCompany , res.company.id);
    return this.cylinderService.remove(+id);
  }
}
