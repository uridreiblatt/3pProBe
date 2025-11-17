import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AllRmaService } from './all-rma.service';
import { CreateAllRmaDto } from './dto/create-all-rma.dto';
import { UpdateAllRmaDto } from './dto/update-all-rma.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('all-rma-ok')
@UseGuards(AuthGuard)
@Controller('all-rma')
export class AllRmaController {
  constructor(private readonly allRmaService: AllRmaService) {}

  @Post()
  async create(@Body() createAllRmaDto: CreateAllRmaDto) {
    return await this.allRmaService.create(createAllRmaDto);
  }

@Get('getAllNewRmaFromPriority')
  async getAllNewRmaFromPriority(@Request() req) {
    return await this.allRmaService.getAllNewRmaFromPriority();
  }



  @Get()
  async findAll(@Request() req) {
    return await this.allRmaService.findAll(req.user.selectCompany);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.allRmaService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAllRmaDto: UpdateAllRmaDto) {
    return await this.allRmaService.update(+id, updateAllRmaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.allRmaService.remove(id);
  }
}
