import { Test, TestingModule } from '@nestjs/testing';
import { ReportViewController } from './report-view.controller';
import { ReportViewService } from './report-view.service';

describe('ReportViewController', () => {
  let controller: ReportViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportViewController],
      providers: [ReportViewService],
    }).compile();

    controller = module.get<ReportViewController>(ReportViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
