import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { DbLogService } from './db-log.service';
import { CreateDbLogDto } from './dto/create-db-log.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { SkipCookieMatch } from 'src/auth/entities/skip-cookie-match.decorator';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('log')
@Controller('db-log')
export class DbLogController {
  constructor(private readonly dbLogService: DbLogService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() createDbLogDto: CreateDbLogDto) {
    return await this.dbLogService.create(createDbLogDto);
  }
  @SkipCookieMatch()
  @UseGuards(AuthGuard)
  @Get()
  findAll(@CurrentCompanyId() companyId: string) {
    return this.dbLogService.findAll(companyId);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.dbLogService.findOne(+id);
    if (companyId !== res.companyId)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'BAD_REQUEST',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: 'invalid company id: ' + companyId,
        },
      );
    return res;
  }
}
