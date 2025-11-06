import { Controller, Get, Post, Body, Param, UseGuards, Request, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { DbLogService } from './db-log.service';
import { CreateDbLogDto } from './dto/create-db-log.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('log')
@Controller('db-log')
export class DbLogController {
  constructor(private readonly dbLogService: DbLogService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req ,@Body() createDbLogDto: CreateDbLogDto) {
    if (req.user.selectCompany !== createDbLogDto.companyId)
        {
            console.error('invalid company');
            throw new HttpException({
                  status: HttpStatus.BAD_REQUEST,
                  error: 'BAD_REQUEST',
                }, HttpStatus.BAD_REQUEST, {
                  cause: 'invalid company id: ' + createDbLogDto.companyId
                });
        }
    return await this.dbLogService.create(createDbLogDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.dbLogService.findAll(req.user.selectCompany);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
    async findOne(@Request() req, @Param('id') id: string) {
      const res = await this.dbLogService.findOne(+id);
      if (req.user.selectCompany !== res.companyId)
              throw BadRequestException;
      return res;
    }
    
}
