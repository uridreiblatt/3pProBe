import { Module } from '@nestjs/common';
import { ReportViewService } from './report-view.service';
import { ReportViewController } from './report-view.controller';
import { ReportView } from './entities/report-view.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReportView])],
  controllers: [ReportViewController],
  providers: [ReportViewService],
})
export class ReportViewModule {}
