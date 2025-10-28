import { PartialType } from '@nestjs/swagger';
import { CreateReportViewDto } from './create-report-view.dto';

export class UpdateReportViewDto extends PartialType(CreateReportViewDto) {}
