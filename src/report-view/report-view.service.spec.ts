import { Test, TestingModule } from '@nestjs/testing';
import { ReportViewService } from './report-view.service';

describe('ReportViewService', () => {
  let service: ReportViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportViewService],
    }).compile();

    service = module.get<ReportViewService>(ReportViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
