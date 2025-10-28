import { Test, TestingModule } from '@nestjs/testing';
import { priorityProductsService } from './priorityProducts.service';

describe('priorityProductsService', () => {
  let service: priorityProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [priorityProductsService],
    }).compile();

    service = module.get<priorityProductsService>(priorityProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
