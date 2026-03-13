import { Test, TestingModule } from '@nestjs/testing';
import { NewCompanyService } from './new-company.service';

describe('NewCompanyService', () => {
  let service: NewCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewCompanyService],
    }).compile();

    service = module.get<NewCompanyService>(NewCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
