import { Test, TestingModule } from '@nestjs/testing';
import { PartCqauntService } from './part-cqaunt.service';

describe('PartCqauntService', () => {
  let service: PartCqauntService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartCqauntService],
    }).compile();

    service = module.get<PartCqauntService>(PartCqauntService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
