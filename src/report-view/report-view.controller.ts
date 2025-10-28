import { Controller, Get, Header, Param, UseGuards } from '@nestjs/common';
import { ReportViewService } from './report-view.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('report-view')
@Controller('report-view')
export class ReportViewController {
  constructor(private readonly reportViewService: ReportViewService) {}

  //@UseGuards(AuthGuard)
  @Get('DashBoard')
  @Header('Cache-Control', 'max-age=0')
  async DashBoard() {
    return await this.reportViewService.DashBoard();
  }
  @Get()
  async findAll() {
    return await this.reportViewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reportViewService.findOne(id);
  }
}
