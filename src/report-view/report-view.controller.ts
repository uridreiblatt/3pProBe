import { Controller, Get, Header, Param, UseGuards , Request} from '@nestjs/common';
import { ReportViewService } from './report-view.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('report-view')
@UseGuards(AuthGuard)
@Controller('report-view')
export class ReportViewController {
  constructor(private readonly reportViewService: ReportViewService) {}

  //@UseGuards(AuthGuard)
  @Get('DashBoard')
  @Header('Cache-Control', 'max-age=0')
  async DashBoard(@Request() req) {
    //console.log(req.user)
    return await this.reportViewService.DashBoard(req.user.selectCompany, req.user.role, req.user.userUuid);
  }

  @Get('Notification')
  async Notification(@Request() req) {
    //console.log(req.user)
    return await this.reportViewService.Notification(req.user.selectCompany, req.user.role, req.user.userUuid);
  }



  
  @Get()
  async findAll() {
    return await this.reportViewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.reportViewService.findOne(id);
  }
}
