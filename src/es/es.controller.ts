import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EsService } from './es.service';
import { CreateEDto } from './dto/create-e.dto';
import { UpdateEDto } from './dto/update-e.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('es')
@Controller('es')
export class EsController {
  constructor(private readonly esService: EsService) {}

  // @Post()
  // create(@Body() createEDto: CreateEDto) {
  //   return this.esService.create(createEDto);
  // }

  // @Get()
  // findAll() {
  //   return this.esService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.esService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEDto: UpdateEDto) {
  //   return this.esService.update(id, updateEDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.esService.remove(id);
  // }
}
