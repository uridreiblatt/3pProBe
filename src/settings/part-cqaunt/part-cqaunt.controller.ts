import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,Request } from '@nestjs/common';
import { PartCqauntService } from './part-cqaunt.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePartCqauntDto } from './dto/create-part-cqaunt.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { validateCompany } from 'src/util/validateCompany.util';
import { UpdateCompanyDto } from 'src/usersCompanies/company/dto/update-company.dto';
import { UpdatePartCqauntDto } from './dto/update-part-cqaunt.dto';
@ApiTags('part-cqaunt-ok')
@UseGuards(AuthGuard)
@Controller('part-cqaunt')
export class PartCqauntController {
  constructor(private readonly partCqauntService: PartCqauntService) {}

  @Post()
    create( @Body() createPartCqauntDto: CreatePartCqauntDto, @Request() req){        
        return this.partCqauntService.create(createPartCqauntDto);
      }
  
    @Get()
    async findAll(@Request() req) {
      return await this.partCqauntService.findAll(req.user.selectCompany);
    }
    @Get(":id")
    async findOne(@Request() req, @Param("id") id: string) {
      const res = await this.partCqauntService.findOne(id);
      validateCompany (req.user.selectCompany , res.company.id);
      return res;
    }
  
    @Patch(":id")
    update(
      //@Request() req,
      @Param("id") id: string,
      @Body() updatePartCqauntDto: UpdatePartCqauntDto
    ) {   
      return this.partCqauntService.update(+id, updatePartCqauntDto);
    }
  
    @Delete(":id")
    async remove(@Request() req, @Param("id") id: string) {
      const res = await this.partCqauntService.findOne(id);
      validateCompany (req.user.selectCompany , res.company.id);
      return this.partCqauntService.remove(+id);
    }
}
