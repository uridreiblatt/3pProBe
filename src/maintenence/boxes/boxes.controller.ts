import {
  BadRequestException,
  Request,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BoxesService } from './boxes.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { SkipCookieMatch } from 'src/auth/entities/skip-cookie-match.decorator';
import { validateCompany } from 'src/util/validateCompany.util';
import { CurrentCompanyId } from 'src/auth/entities/current-user.decorator';
@ApiTags('boxes-ok')
@Controller('boxes')
@UseGuards(AuthGuard)
export class BoxesController {
  constructor(private readonly boxesService: BoxesService) {}
  @Post()
  create(@Body() createBoxDto: CreateBoxDto, @Request() req) {
    return this.boxesService.create(
      createBoxDto,
      req.user.userId,
      req.user.selectCompany,
    );
  }

  @Get()
  async findAll(@CurrentCompanyId() companyId: string) {
    return await this.boxesService.findAll(companyId);
  }
  @Get(':id')
  async findOne(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
  ) {
    const res = await this.boxesService.findOne(id, companyId);
    return res;
  }

  @Patch(':id')
  update(
    @CurrentCompanyId() companyId: string,
    @Param('id') id: string,
    @Body() updateBoxDto: UpdateBoxDto,
  ) {
    return this.boxesService.update(id, updateBoxDto, companyId);
  }

  @Delete(':id')
  async remove(@CurrentCompanyId() companyId: string, @Param('id') id: string) {
    return this.boxesService.remove(id, companyId);
  }
}
