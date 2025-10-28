import { Test, TestingModule } from '@nestjs/testing';
import { PriorityProductsHierarchyService } from './priority-products-hierarchy.service';

describe('PriorityProductsHierarchyService', () => {
  let service: PriorityProductsHierarchyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriorityProductsHierarchyService],
    }).compile();

    service = module.get<PriorityProductsHierarchyService>(
      PriorityProductsHierarchyService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
