import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DbLogService } from './db-log.service';
import { CreateDbLogDto } from './dto/create-db-log.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('log')
@Controller('db-log')
export class DbLogController {
  constructor(private readonly dbLogService: DbLogService) {}

  @Post()
  create(@Body() createDbLogDto: CreateDbLogDto) {
    return this.dbLogService.create(createDbLogDto);
  }

  @Get()
  findAll() {
    return this.dbLogService.findAll();
  }
  @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.dbLogService.findOne(+id);
    }
}
