import { Test, TestingModule } from '@nestjs/testing';
import { AllRmaService } from './all-rma.service';

describe('AllRmaService', () => {
  let service: AllRmaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllRmaService],
    }).compile();

    service = module.get<AllRmaService>(AllRmaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
