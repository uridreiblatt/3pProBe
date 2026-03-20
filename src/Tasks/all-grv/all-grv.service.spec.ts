import { Test, TestingModule } from '@nestjs/testing';
import { AllGrvService } from './all-grv.service';

describe('AllGrvService', () => {
  let service: AllGrvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllGrvService],
    }).compile();

    service = module.get<AllGrvService>(AllGrvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
