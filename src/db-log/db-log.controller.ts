import { Controller, Get, Post, Body } from '@nestjs/common';
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
}
